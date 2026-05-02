/**
 * Script.js - Dr. Luis Gómez Landing
 * - Formulario de contacto → envío a email (backend Vercel)
 * - Widget Doctoralia dinámico
 * - Navegación fluida
 * - Analytics básico (localStorage, sin tracking externo)
 */

// ========================
// INICIALIZACIÓN
// ========================

document.addEventListener('DOMContentLoaded', () => {
  setupForm();
  setupDoctoralia();
  setupNavigation();
  setupHamburgerMenu();
  trackPageView();
});

// ========================
// FORMULARIO → EMAIL
// ========================

function setupForm() {
  const form = document.getElementById('contactForm');
  const statusDiv = document.getElementById('formStatus');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !mensaje) {
      showStatus('Por favor completa todos los campos', 'error', statusDiv);
      return;
    }

    // Mostrar estado de carga
    const btnSubmit = form.querySelector('button[type="submit"]');
    const originalText = btnSubmit.innerText;
    btnSubmit.innerText = 'Enviando...';
    btnSubmit.disabled = true;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          mensaje,
          timestamp: new Date().toISOString(),
          pagina: window.location.pathname
        })
      });

      const data = await response.json();

      if (response.ok) {
        showStatus('✅ Consulta enviada exitosamente. Te responderé pronto.', 'success', statusDiv);
        form.reset();
        trackEvent('form_submit_success', { nombre });
      } else {
        showStatus(`Error: ${data.error || 'No se pudo enviar la consulta'}`, 'error', statusDiv);
        trackEvent('form_submit_error', { error: data.error });
      }
    } catch (error) {
      console.error('Error enviando formulario:', error);
      showStatus('Error de conexión. Intenta de nuevo más tarde.', 'error', statusDiv);
      trackEvent('form_submit_error', { error: error.message });
    } finally {
      btnSubmit.innerText = originalText;
      btnSubmit.disabled = false;
    }
  });
}

function showStatus(message, type, element) {
  element.className = `form-status ${type}`;
  element.innerText = message;
  element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Auto-ocultar después de 5 segundos
  if (type === 'success') {
    setTimeout(() => {
      element.className = 'form-status';
    }, 5000);
  }
}

// ========================
// WIDGET DOCTORALIA
// ========================

function setupDoctoralia() {
  const widget = document.getElementById('doctoralia-widget');
  if (!widget) return;

  // Reemplazar mensaje de carga con iframe
  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.doctoralia.cl/booking/haga-una-cita/8585/67473';
  iframe.width = '100%';
  iframe.height = '600';
  iframe.frameborder = '0';
  iframe.style.borderRadius = '1.5rem';

  // Limpiar widget y agregar iframe
  widget.innerHTML = '';
  widget.appendChild(iframe);

  trackEvent('doctoralia_widget_loaded', {});
}

// ========================
// NAVEGACIÓN FLUIDA
// ========================

function setupNavigation() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        const offsetTop = target.offsetTop - 80; // Compensar navbar fijo
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Cerrar menú hamburguesa si está abierto
        closeHamburgerMenu();
        
        trackEvent('nav_click', { destino: href });
      }
    });
  });
}

// ========================
// MENÚ HAMBURGUESA (MÓVIL)
// ========================

function setupHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
  });
}

function closeHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navMenu) {
    navMenu.style.display = 'none';
    hamburger?.classList.remove('active');
  }
}

// ========================
// ANALYTICS (LOCAL ONLY)
// ========================

function trackPageView() {
  const event = {
    type: 'pageview',
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
    referrer: document.referrer || 'directo',
    device: /Mobile|Android|iPhone/.test(navigator.userAgent) ? 'mobile' : 'desktop',
    viewport: `${window.innerWidth}x${window.innerHeight}`
  };

  console.log('[Analytics] Page View:', event);
  saveEvent(event);
}

function trackEvent(eventName, data = {}) {
  const event = {
    type: 'event',
    nombre: eventName,
    timestamp: new Date().toISOString(),
    datos: data,
    page: window.location.pathname
  };

  console.log('[Analytics]', eventName, data);
  saveEvent(event);
}

function saveEvent(event) {
  try {
    let eventos = JSON.parse(localStorage.getItem('dr_gomez_events')) || [];
    eventos.push(event);
    
    // Mantener solo últimos 100 eventos
    if (eventos.length > 100) {
      eventos = eventos.slice(-100);
    }
    
    localStorage.setItem('dr_gomez_events', JSON.stringify(eventos));
  } catch (e) {
    console.log('localStorage no disponible');
  }
}

// ========================
// UTILIDADES
// ========================

// Detectar conexión offline
window.addEventListener('offline', () => {
  console.warn('⚠️ Sin conexión a internet');
});

window.addEventListener('online', () => {
  console.log('✅ Conexión recuperada');
});

// Smooth scroll nativo para navegadores antiguos
if (!CSS.supports('scroll-behavior', 'smooth')) {
  document.documentElement.style.scrollBehavior = 'auto';
}

// Export para debugging en consola
window.debugAnalytics = () => {
  const eventos = JSON.parse(localStorage.getItem('dr_gomez_events')) || [];
  console.table(eventos);
  return eventos;
};

window.clearAnalytics = () => {
  localStorage.removeItem('dr_gomez_events');
  console.log('Analytics borrados');
};
