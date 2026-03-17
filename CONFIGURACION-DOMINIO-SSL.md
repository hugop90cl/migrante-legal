# 🌐 Configuración de Dominio y SSL para Migrante Legal

## 📋 PASOS PARA ACTIVAR migrantelegal.cl CON SSL

### 🔧 **PASO 1: Configurar DNS (CRÍTICO)**

**Accede al panel de control de tu proveedor de dominio** y configura estos registros DNS:

```
Tipo: A
Nombre: @
Valor: 31.220.75.226
TTL: 300 (o automático)

Tipo: A  
Nombre: www
Valor: 31.220.75.226
TTL: 300 (o automático)
```

**⚠️ IMPORTANTE:** La propagación DNS puede tardar entre 5 minutos y 24 horas. Puedes verificar con:
```bash
dig migrantelegal.cl
dig www.migrantelegal.cl
```

---

### 🚀 **PASO 2: Ejecutar Configuración Automática**

Una vez configurado el DNS, ejecuta el script automático:

```bash
./configurar-ssl.sh
```

**El script hará automáticamente:**
1. ✅ Verificar que DNS esté configurado  
2. ✅ Detener contenedores actuales
3. ✅ Iniciar con configuración HTTP inicial
4. ✅ Obtener certificados SSL de Let's Encrypt  
5. ✅ Activar configuración HTTPS
6. ✅ Configurar renovación automática

---

### 🔍 **VERIFICACIÓN**

Después de ejecutar el script, tu sitio estará disponible en:

- **🌐 https://migrantelegal.cl** ← Principal
- **🌐 https://www.migrantelegal.cl** ← Con www
- **🔒 Certificado SSL válido** ← Let's Encrypt

**Verificar SSL:**
- Certificado válido ✅
- Redirección HTTP → HTTPS automática ✅  
- Headers de seguridad configurados ✅

---

### 🔄 **RENOVACIÓN AUTOMÁTICA**

El script crea `renovar-ssl.sh` para renovar certificados:

```bash
# Renovar manualmente
./renovar-ssl.sh

# Programar en cron (recomendado)
crontab -e
# Añadir línea:
0 3 * * 1 /opt/projects/migrante-legal/renovar-ssl.sh
```

---

### ⚡ **SERVICIOS FINALES**

Una vez completada la configuración:

| Servicio | URL | Puerto | SSL |
|----------|-----|--------|-----|
| **Web Principal** | https://migrantelegal.cl | 443 | ✅ |
| **pgAdmin** | http://31.220.75.226:5052 | 5052 | ❌ |
| **PostgreSQL** | 31.220.75.226:5434 | 5434 | ❌ |

---

### 🛠️ **COMANDOS ÚTILES**

```bash
# Ver logs de nginx
docker logs migrantelegal-nginx

# Ver logs de certbot  
docker logs migrantelegal-certbot

# Reiniciar nginx
docker compose exec nginx nginx -s reload

# Ver certificados
docker compose exec nginx ls -la /etc/letsencrypt/live/

# Verificar configuración nginx
docker compose exec nginx nginx -t
```

---

### ❌ **TROUBLESHOOTING**

**Error: DNS no configurado**
- Verificar registros A en DNS
- Esperar propagación (hasta 24h)
- Usar herramientas: https://dnschecker.org

**Error al obtener certificados**
- Verificar que puertos 80/443 estén abiertos
- Comprobar que nginx responda en HTTP
- Revisar logs de certbot

**SSL no funciona**
- Verificar que certificados existan
- Comprobar configuración nginx
- Reiniciar contenedores: `docker compose restart`

---

🎉 **¡Tu sitio estará listo con HTTPS en migrantelegal.cl!**