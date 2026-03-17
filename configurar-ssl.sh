#!/bin/bash

# ============================================
# Script de configuración SSL para Migrante Legal  
# Automatiza la obtención e instalación de certificados SSL
# ============================================

echo "🚀 Iniciando configuración de SSL para migrantelegal.cl..."

# Variables
DOMAIN="migrantelegal.cl"
NGINX_CONTAINER="migrantelegal-nginx"
CERTBOT_CONTAINER="migrantelegal-certbot"

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Función para verificar si el dominio apunta al servidor
check_dns() {
    echo "🔍 Verificando configuración DNS..."
    
    SERVER_IP=$(curl -s ifconfig.me)
    DOMAIN_IP=$(dig +short $DOMAIN | tail -n1)
    
    echo "IP del servidor: $SERVER_IP"
    echo "IP del dominio $DOMAIN: $DOMAIN_IP"
    
    if [[ "$SERVER_IP" == "$DOMAIN_IP" ]]; then
        print_status "DNS configurado correctamente"
        return 0
    else
        print_warning "DNS no configurado o propagación pendiente"
        echo "Para continuar, configura tu DNS:"
        echo "Tipo: A"
        echo "Nombre: @ (root domain)"
        echo "Valor: $SERVER_IP"
        echo "Tipo: A"  
        echo "Nombre: www"
        echo "Valor: $SERVER_IP"
        echo ""
        read -p "¿DNS ya configurado? Presiona Enter para continuar o Ctrl+C para cancelar..."
        return 0
    fi
}

# Paso 1: Verificar DNS
check_dns

# Paso 2: Detener servicios actuales si están corriendo
echo "🛑 Deteniendo servicios actuales..."
docker compose down

# Paso 3: Iniciar con configuración HTTP inicial
print_status "Iniciando servicios con configuración HTTP..."
docker compose up -d postgres pgadmin app nginx

# Esperar que los servicios estén listos
echo "⏳ Esperando que los servicios inicien..."
sleep 30

# Verificar que nginx esté respondiendo
print_status "Verificando que nginx esté funcionando..."
if ! curl -f http://localhost/.well-known/acme-challenge/ &>/dev/null; then
    print_warning "Nginx iniciado (normal que falle esta verificación)"
fi

# Paso 4: Obtener certificados SSL (modo staging primero)
print_status "Obteniendo certificados SSL en modo staging (prueba)..."
docker compose run --rm certbot

# Verificar si se obtuvieron los certificados de staging
if docker compose exec nginx ls /etc/letsencrypt/live/$DOMAIN/ &>/dev/null; then
    print_status "Certificados de staging obtenidos correctamente!"
    
    # Paso 5: Obtener certificados de producción
    print_warning "Obteniendo certificados de PRODUCCIÓN..."
    
    # Remover --staging del docker-compose.yml
    sed -i 's/--staging //' docker-compose.yml
    
    # Obtener certificados reales
    docker compose run --rm certbot
    
    if docker compose exec nginx ls /etc/letsencrypt/live/$DOMAIN/fullchain.pem &>/dev/null; then
        print_status "¡Certificados SSL de producción obtenidos!"
        
        # Paso 6: Cambiar a configuración HTTPS
        print_status "Activando configuración HTTPS..."
        
        # Hacer backup de la configuración HTTP
        docker compose exec nginx mv /etc/nginx/conf.d/migrantelegal.conf /etc/nginx/conf.d/migrantelegal.conf.backup
        
        # Activar configuración HTTPS
        docker compose exec nginx mv /etc/nginx/conf.d/migrantelegal-ssl.conf /etc/nginx/conf.d/migrantelegal.conf
        
        # Recargar nginx
        docker compose exec nginx nginx -s reload
        
        print_status "¡SSL configurado exitosamente!"
        print_status "Tu sitio ahora está disponible en:"
        echo "🌐 https://$DOMAIN"
        echo "🌐 https://www.$DOMAIN"
        
    else
        print_error "Error al obtener certificados de producción"
        exit 1
    fi
else
    print_error "Error al obtener certificados de staging"
    exit 1
fi

# Paso 7: Configurar renovación automática
print_status "Configurando renovación automática..."
cat > renovar-ssl.sh << 'EOF'
#!/bin/bash
echo "🔄 Renovando certificados SSL..."
docker compose run --rm certbot renew
docker compose exec nginx nginx -s reload
echo "✅ Certificados renovados"
EOF

chmod +x renovar-ssl.sh

print_status "Script de renovación creado: ./renovar-ssl.sh"
print_status "Programar en cron: 0 3 * * 1 /ruta/al/proyecto/renovar-ssl.sh"

echo ""
print_status "¡Configuración SSL completada con éxito!"
echo "🔒 Tu sitio ahora tiene SSL/HTTPS activo"
echo "🌐 Accede a: https://$DOMAIN"