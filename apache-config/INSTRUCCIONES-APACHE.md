# Instrucciones para Configurar Apache con Migrante Legal

## Problema Resuelto
El contenedor nginx estaba capturando los puertos 80 y 443, bloqueando Apache y haciendo que todos los sitios del servidor mostraran migrante-legal.

## Solución Implementada
- Docker usa ahora los puertos **8080** y **8443**
- Apache maneja los puertos **80** y **443** para todos los sitios
- Apache hace proxy reverso a migrante-legal en el contenedor Docker

---

## Pasos de Instalación

### 1. Copiar configuración de Apache
```bash
# Copiar la configuración inicial (sin SSL)
sudo cp /opt/projects/migrante-legal/apache-config/migrantelegal.conf /etc/apache2/sites-available/

# Verificar que se copió correctamente
ls -la /etc/apache2/sites-available/ | grep migrantelegal
```

### 2. Habilitar módulos necesarios de Apache
```bash
# Habilitar módulos de proxy
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod headers
sudo a2enmod rewrite
sudo a2enmod ssl

# Verificar que se habilitaron
apache2ctl -M | grep proxy
```

### 3. Activar el sitio
```bash
# Activar la configuración
sudo a2ensite migrantelegal.conf

# Verificar sintaxis de Apache
sudo apache2ctl configtest

# Si todo está OK, reiniciar Apache
sudo systemctl restart apache2
sudo systemctl status apache2
```

### 4. Iniciar los contenedores Docker
```bash
cd /opt/projects/migrante-legal
docker compose up -d

# Verificar que estén corriendo
docker compose ps
```

### 5. Verificar que funciona (HTTP)
```bash
# Probar desde el servidor
curl -I http://migrantelegal.cl

# Debería devolver 200 OK y mostrar el sitio
```

### 6. Obtener Certificado SSL con Certbot
```bash
# Obtener certificado SSL para migrantelegal.cl
sudo certbot --apache -d migrantelegal.cl -d www.migrantelegal.cl

# Certbot configurará automáticamente el SSL en Apache
# Y modificará/creará el archivo migrantelegal-le-ssl.conf
```

### 7. Verificar todos los sitios
```bash
# Verificar que todos los sitios vuelvan a funcionar
sudo apache2ctl -S   # Listar todos los virtual hosts

# Probar algunos sitios
curl -I https://kossacksc.cl
curl -I https://migrantelegal.cl
```

---

## Verificación de Estado

### Ver logs de Apache
```bash
# Logs generales
sudo tail -f /var/log/apache2/error.log

# Logs específicos de migrante-legal
sudo tail -f /var/log/apache2/migrantelegal-error.log
sudo tail -f /var/log/apache2/migrantelegal-access.log
```

### Ver logs del contenedor
```bash
cd /opt/projects/migrante-legal
docker compose logs -f app
docker compose logs -f nginx
```

### Verificar puertos
```bash
# Apache debe estar en 80 y 443
sudo netstat -tlnp | grep apache2

# Docker debe estar en 8080 y 8443
sudo netstat -tlnp | grep docker
```

---

## Troubleshooting

### Si Apache no inicia
```bash
# Ver el error específico
sudo systemctl status apache2
sudo journalctl -xeu apache2

# Verificar sintaxis
sudo apache2ctl configtest
```

### Si el proxy no funciona
```bash
# Verificar que el contenedor esté corriendo
docker compose ps

# Verificar que responda en 8080
curl -I http://localhost:8080

# Ver logs de Apache
sudo tail -30 /var/log/apache2/migrantelegal-error.log
```

### Si otros sitios no funcionan
```bash
# Listar todos los virtual hosts activos
sudo apache2ctl -S

# Verificar que sus configuraciones estén habilitadas
ls -la /etc/apache2/sites-enabled/
```

---

## Configuración de Puertos

| Servicio                | Puerto Host | Puerto Contenedor |
|------------------------|-------------|-------------------|
| Apache HTTP            | 80          | -                 |
| Apache HTTPS           | 443         | -                 |
| Docker Nginx HTTP      | 8080        | 80                |
| Docker Nginx HTTPS     | 8443        | 443               |
| Next.js App (interno)  | -           | 3001              |
| PostgreSQL             | 5434        | 5432              |
| pgAdmin                | 5052        | 80                |

---

## Mantenimiento

### Reiniciar servicios
```bash
# Reiniciar Apache
sudo systemctl restart apache2

# Reiniciar contenedores Docker
cd /opt/projects/migrante-legal
docker compose restart
```

### Renovar certificado SSL
```bash
# Certbot renovará automáticamente, pero se puede forzar:
sudo certbot renew --dry-run

# Renovación real
sudo certbot renew
```

### Ver certificados activos
```bash
sudo certbot certificates
```
