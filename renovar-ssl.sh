#!/bin/bash

# ============================================
# Script de Renovación Automática SSL
# Para renovar certificados de Let's Encrypt
# ============================================

echo "🔄 Iniciando renovación de certificados SSL..."

# Renovar certificados
docker compose run --rm certbot renew

# Verificar si la renovación fue exitosa
if [ $? -eq 0 ]; then
    echo "✅ Certificados renovados exitosamente"
    
    # Recargar nginx para aplicar nuevos certificados
    docker compose exec nginx nginx -s reload
    
    if [ $? -eq 0 ]; then
        echo "✅ Nginx recargado exitosamente"
        echo "🎉 Renovación SSL completada"
    else
        echo "❌ Error al recargar nginx"
        exit 1
    fi
else
    echo "❌ Error en la renovación de certificados"
    exit 1
fi

echo "📅 Próxima renovación recomendada: $(date -d '+60 days' '+%Y-%m-%d')"