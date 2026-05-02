# 🚀 GUÍA RÁPIDA - Dr. Luis Gómez Landing

**Versión rediseñada:** Mayo 2026  
**Tiempo de despliegue:** ~5 minutos

---

## ✅ Lo que ya está listo

| Componente | Estado |
|-----------|--------|
| HTML (5 secciones) | ✅ Listo |
| CSS (paleta NotebookLM) | ✅ Listo |
| JavaScript (formulario, nav) | ✅ Listo |
| API Vercel (email) | ✅ Listo |
| Config centralizada | ✅ Listo |

---

## 🎬 Pasos Para Desplegar (Opción Fácil)

### 1. **Prepara tu repositorio GitHub**

```bash
# En tu carpeta del proyecto
cd Landing_Google

# Inicializar git
git init
git add .
git commit -m "Dr. Gomez Landing v2"

# Crear repo en https://github.com/new
# Luego pushear:
git remote add origin https://github.com/TU_USER/dr-gomez-landing.git
git push -u origin main
```

### 2. **Desplegar en Vercel (1 click)**

1. Ve a https://vercel.com/ → Sign in con GitHub
2. Haz clic en "Add New" → "Project"
3. Selecciona `dr-gomez-landing`
4. Haz clic en "Deploy"

**¡Listo!** Tu sitio estará en vivo en 60 segundos.

URL: `https://tu-proyecto.vercel.app`

---

## 📸 Cambiar Fotos (Local)

Antes de pushear a GitHub:

```bash
# 1. Crea carpeta de imágenes
mkdir img

# 2. Copia tus fotos
cp /ruta/a/foto_profesional.jpg img/
cp /ruta/a/dr_doodle.png img/

# 3. Actualiza index.html
# Busca estas líneas y reemplaza el src:

<!-- HERO PHOTO -->
<img src="img/dr_luis_profesional.jpg" alt="Dr. Luis Gómez">

<!-- DOODLE PHOTO -->
<img src="img/dr_doodle.png" alt="Dr. Doodle">
```

---

## ⚙️ Configuración Mínima (Antes de Desplegar)

### 1. **Email de Contacto**

En `api/contact.js`, reemplaza:
```javascript
to: 'drgomezuro82@gmail.com',  // ← Tu email aquí
```

### 2. **Números y URLs**

En `config.json` (opcional, pero limpio):
```json
{
  "contacto": {
    "whatsapp": "+56987637989",
    "instagram": "https://www.instagram.com/dr_gomez_uro/"
  }
}
```

---

## 📧 Activar Email (Backend)

**El formulario necesita un backend para enviar emails.**

### Opción A: Resend (Recomendado - Gratis)

1. Ve a https://resend.com/ → Sign up
2. Copia tu API Key
3. En Vercel Dashboard:
   - Proyecto → Settings → Environment Variables
   - Agrega: `RESEND_API_KEY` = `tu_key`
4. Deploy automático

**Listo** — El formulario enviará emails a tu bandeja.

### Opción B: Email simulado (Testing)

Deja `api/contact.js` sin modificar. El formulario mostrará "Enviado" pero el backend es mock (para testing local).

---

## 🔗 URLs Finales (Después de Desplegar)

Una vez en Vercel, actualiza:

- **Bio Instagram:** Tu URL de Vercel (ej: `https://dr-gomez-landing.vercel.app`)
- **Links internos:** Ya están configurados (Doctoralia, WhatsApp, etc.)

---

## 🎨 Estructura del Proyecto

```
Landing_Google/
├── index.html           ← HTML (5 secciones)
├── style.css            ← CSS rediseñado
├── script.js            ← JavaScript
├── config.json          ← Datos centralizados
├── vercel.json          ← Config Vercel
├── api/
│   └── contact.js       ← API serverless (emails)
├── img/                 ← Tus fotos
│   ├── dr_luis_profesional.jpg
│   └── dr_doodle.png
└── README.md            ← Documentación completa
```

---

## 📋 Checklist Antes de Ir a Producción

- [ ] Fotos profesionales insertadas (`img/dr_luis_*.jpg`)
- [ ] Email correcto en `api/contact.js`
- [ ] Resend API Key configurada en Vercel (si usas)
- [ ] URLs de Redsalud/Doctoralia verificadas
- [ ] Instagram URL actualizado en bio
- [ ] Testing local funciona (F12 → Sin errores)

---

## 🐛 Testing Local (Antes de Desplegar)

```bash
# Con Python
python -m http.server 8000

# Luego abre: http://localhost:8000
# F12 → Console para ver logs
```

---

## 💾 Resumen de Cambios (v2.0)

| Anterior | Nuevo |
|----------|-------|
| 1 sección hero | 5 secciones optimizadas |
| Paleta genérica | Azul-púrpura NotebookLM |
| Links estáticos | Widget Doctoralia dinámico |
| Whatsapp directo | Formulario → Email + Whatsapp |
| Sin backend | API serverless Vercel |

---

## ❓ Dudas Frecuentes

**P: ¿Cuánto cuesta?**  
R: Vercel (FREE), Resend (FREE hasta 100 emails/mes). Total: $0

**P: ¿Cómo actualizo el sitio?**  
R: Edita archivos locales → `git push` → Vercel redeploy automático

**P: ¿Dónde veo los emails?**  
R: Van a tu bandeja (Gmail, Outlook, etc.) — configura en Resend

**P: ¿El widget de Doctoralia funciona?**  
R: Sí, carga dinámicamente. Verifica en tu navegador (sin errores en F12)

---

## 🎯 Próximos Pasos (Después de Desplegar)

1. ✅ Monitorear eventos en consola (`window.debugAnalytics()`)
2. ✅ Integrar WhatsApp Bot (si lo necesitas)
3. ✅ Automatizar reseñas Doctoralia
4. ✅ A/B testing de CTAs

---

**¡Listo para desplegar!** 🚀

Cualquier duda, revisa `README.md` o contacta a Claude.
