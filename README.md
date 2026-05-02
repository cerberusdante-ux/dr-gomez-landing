# Dr. Luis Gómez - Landing Page

**Versión:** 2.0 (Rediseño completo)  
**Última actualización:** Mayo 2026

---

## 📋 Contenido del Proyecto

```
Landing_Google/
├── index.html              # HTML principal (5 secciones)
├── style.css               # CSS rediseñado (paleta NotebookLM)
├── script.js               # JavaScript (formulario, navegación, analytics)
├── api/
│   └── contact.js          # API serverless (Vercel)
├── vercel.json             # Config de despliegue Vercel
├── config.json             # Configuración centralizada (datos)
└── README.md               # Este archivo
```

---

## 🎨 Características Nuevas

✅ **5 Secciones optimizadas:**
1. **Hero** — Foto principal + tagline
2. **Acerca de mí** — Historia del Dr. + imagen Dr. Doodle
3. **Consultas** — 3 lugares de atención (Redsalud + Telemedicina)
4. **Agenda Online** — Widget Doctoralia interactivo
5. **Contacto** — Formulario → email + WhatsApp directo

✅ **Diseño:**
- Paleta **azul-púrpura** (inspiración NotebookLM)
- Responsive (móvil + desktop)
- Animaciones suaves y fluidas
- Sombras y profundidad modernas

✅ **Funcionalidad:**
- Formulario de contacto → email a `drgomezuro82@gmail.com`
- Widget calendario Doctoralia integrado
- Navegación fluida con smooth scroll
- Analytics local (localStorage, sin tracking externo)
- Menú hamburguesa para móvil

---

## 🚀 Guía de Instalación y Despliegue

### Opción 1: Desplegar en Vercel (RECOMENDADO - Gratis)

#### Paso 1: Preparar el repositorio
```bash
# En tu carpeta local
git init
git add .
git commit -m "Initial commit: Dr. Gómez Landing rediseño"
```

#### Paso 2: Conectar a GitHub
1. Ve a https://github.com/new
2. Crea un nuevo repositorio (ej: `dr-gomez-landing`)
3. Sigue las instrucciones para pushear tu código local

#### Paso 3: Desplegar en Vercel
1. Ve a https://vercel.com/
2. Haz login con GitHub
3. Haz clic en "Add New..." → "Project"
4. Selecciona tu repositorio `dr-gomez-landing`
5. Haz clic en "Deploy"

**Listo.** Tu sitio estará en vivo en ~60 segundos.

---

### Opción 2: Desplegar localmente (Testing)

```bash
# Opción A: Con Python (simplest)
python -m http.server 8000

# Opción B: Con Node.js + http-server
npm install -g http-server
http-server

# Opción C: Con VS Code
# Instala extensión "Live Server" → click derecho → "Open with Live Server"
```

Accede a http://localhost:8000

---

## 🔧 Configuración

### 1. **Actualizar datos en `config.json`**

```json
{
  "contacto": {
    "whatsapp": "+56987637989",
    "instagram": "https://www.instagram.com/dr_gomez_uro/"
  },
  "plataformas": {
    "doctoralia": {
      "url": "https://www.doctoralia.cl/booking/..."
    }
  }
}
```

### 2. **Cambiar fotos**

En `index.html`, busca las líneas:
```html
<!-- HERO - Foto principal -->
<img src="data:image/svg+xml,..." alt="Dr. Luis Gómez" class="hero-photo">

<!-- ABOUT - Imagen Dr. Doodle -->
<img src="data:image/svg+xml,..." alt="Dr. Doodle" class="doodle-image">
```

Reemplaza `data:image/svg+xml,...` con la ruta a tus imágenes:
```html
<img src="img/dr_luis_profesional.webp" alt="Dr. Luis Gómez" class="hero-photo">
```

**Pasos:**
1. Copia tus fotos (formato: JPG, PNG, o WebP) a una carpeta `img/`
2. Actualiza los `src` en index.html

### 3. **Cambiar email de contacto (si usas Vercel + Resend)**

En `api/contact.js`:
```javascript
// Línea ~30
await resend.emails.send({
  from: 'noreply@tu-dominio.com',
  to: 'TU_EMAIL_AQUI@gmail.com',  // ← Cambiar aquí
  subject: `Nueva consulta de ${nombre}`,
  ...
});
```

---

## 📧 Configurar Email (Backend)

El formulario de contacto requiere un backend para enviar emails. **Tienes 2 opciones:**

### Opción A: Usar Resend (Gratis, recomendado)

1. Ve a https://resend.com/
2. Crea cuenta gratis
3. Obtén tu API Key
4. En Vercel, ve a **Settings** → **Environment Variables**
5. Agrega:
   - Nombre: `RESEND_API_KEY`
   - Valor: `tu_api_key_resend`

6. En `api/contact.js`, descomenta la sección Resend:
```javascript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
// ... resto del código
```

### Opción B: Usar tu email existente (más complicado)

- **SMTP:** Usa SendGrid, Mailgun, o tu proveedor de email
- **Requiere:** Variables de entorno (usuario, contraseña, servidor SMTP)

**Por ahora, te recomiendo Resend — es gratis y tarda 2 minutos.**

---

## 🎯 Instrucciones para Reemplazar Fotos

### Foto del Hero (Dr. Luis Gómez)

1. **Obtén una foto profesional:**
   - Recomendación: 400x500px mínimo
   - Formato: JPG (optimizado) o PNG
   - Fondo blanco o neutro

2. **Comprime la imagen:**
   - Usa https://tinypng.com/ o https://www.imageoptimizer.com/
   - Objetivo: <100KB

3. **Sube a tu proyecto:**
   ```bash
   # Crea carpeta
   mkdir img
   
   # Copia tu foto
   cp /ruta/a/foto.jpg img/dr_luis_profesional.jpg
   ```

4. **Actualiza HTML:**
   ```html
   <img src="img/dr_luis_profesional.jpg" alt="Dr. Luis Gómez" class="hero-photo">
   ```

### Imagen Dr. Doodle

1. **Obtén o crea la imagen de Dr. Doodle:**
   - Tamaño: 300x300px
   - Fondo transparente (PNG)
   - Color dominante: púrpura o similar

2. **Sube:**
   ```bash
   cp /ruta/a/dr_doodle.png img/
   ```

3. **Actualiza HTML:**
   ```html
   <img src="img/dr_doodle.png" alt="Dr. Doodle" class="doodle-image">
   ```

---

## 🔗 URLs Importantes

| Recurso | URL |
|---------|-----|
| Landing (producción) | https://dr-doodle-landing.vercel.app |
| Doctoralia | https://www.doctoralia.cl/booking/... |
| Instagram | https://www.instagram.com/dr_gomez_uro/ |
| WhatsApp | https://wa.me/56987637989 |
| Redsalud San Miguel | https://www.redsalud.cl/sucursales/redsalud-san-miguel |
| Redsalud La Florida | https://www.redsalud.cl/sucursales/redsalud-la-florida |
| Telemedicina | https://agenda.redsalud.cl/patientPortal/identifyPatient |

---

## 🛠️ Debugging y Analytics

### Ver eventos guardados
Abre la consola (F12) y ejecuta:
```javascript
window.debugAnalytics()
```

Verás tabla de todos los eventos (clicks, form submissions, etc.)

### Limpiar analytics
```javascript
window.clearAnalytics()
```

---

## ⚠️ Notas Importantes

1. **Datos clínicos:** No guardes datos sensibles de pacientes en localStorage
2. **GDPR/RGPD:** El sitio usa analytics mínimo (no Google Analytics, no cookies de terceros)
3. **Privacidad:** Mensajes de WhatsApp van directamente a tu número, no se guardan en el servidor
4. **Emails:** Requieren configuración de backend (Resend o similar)

---

## 📞 Próximos Pasos

Una vez el landing esté desplegado:

1. ✅ Agregar URL al bio de Instagram
2. ✅ Monitorear clics y conversiones (analytics local)
3. ✅ Integrar WhatsApp Bot (próxima fase)
4. ✅ Automatizar reseñas Doctoralia

---

## 📝 Versión y Historial

- **v2.0 (Mayo 2026):** Rediseño completo (5 secciones, paleta NotebookLM, backend email)
- **v1.0:** Versión anterior (archivada en `index.backup.html`)

---

**Creado por:** Claude (Anthropic)  
**Para:** Dr. Luis Gómez  
**Tema:** Urología integral con Dr. Doodle
