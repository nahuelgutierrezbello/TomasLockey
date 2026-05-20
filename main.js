/*
  El Picazo · Tomas Lockey
  JavaScript sin dependencias: menú mobile, navegación por secciones,
  animaciones suaves, carrusel, formularios a WhatsApp y placeholders.
*/

const TOMAS_WHATSAPP = '5491167898280';

const whatsappMessages = {
  curso: 'Hola Tomas, me interesa el curso online de El Picazo.',
  consulta: 'Hola Tomas, tengo un caso puntual con mi caballo y quiero reservar una consulta online.',
  consultoria: 'Hola Tomas, me interesa la propuesta de consultoría para haras o centro de cría.',
  contacto: 'Hola Tomas, vengo desde la web de El Picazo y quiero hacerte una consulta.',
  lamina: 'Hola Tomas, quiero recibir información sobre El Mapa del Casco.'
};

function whatsappLink(type = 'contacto', extraMessage = '') {
  const baseMessage = whatsappMessages[type] || whatsappMessages.contacto;
  const message = extraMessage ? `${baseMessage} ${extraMessage}` : baseMessage;
  return `https://wa.me/${TOMAS_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function setWhatsappLinks() {
  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    const type = link.getAttribute('data-whatsapp') || 'contacto';
    link.setAttribute('href', whatsappLink(type));
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
}

function setupMenu() {
  const button = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-main-nav]');
  if (!button || !nav) return;

  button.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('menu-open');
    button.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
      button.setAttribute('aria-expanded', 'false');
    });
  });
}

function setupActiveNav() {
  const navLinks = Array.from(document.querySelectorAll('[data-main-nav] a[href^="#"]'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!navLinks.length || !sections.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  if (!('IntersectionObserver' in window)) {
    const initial = window.location.hash.replace('#', '') || 'inicio';
    setActive(initial);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible && visible.target.id) {
      setActive(visible.target.id);
    }
  }, {
    rootMargin: '-35% 0px -50% 0px',
    threshold: [0.08, 0.18, 0.32, 0.5]
  });

  sections.forEach((section) => observer.observe(section));
}

function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  items.forEach((item) => observer.observe(item));
}

function setupSliders() {
  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const track = slider.querySelector('[data-slider-track]');
    const prev = slider.querySelector('[data-slider-prev]');
    const next = slider.querySelector('[data-slider-next]');
    if (!track || !prev || !next) return;

    const move = (direction) => {
      const firstCard = track.querySelector(':scope > *');
      const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 320;
      track.scrollBy({ left: direction * (cardWidth + 18), behavior: 'smooth' });
    };

    prev.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
  });
}

function setupLeadForms() {
  document.querySelectorAll('[data-lead-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input ? input.value.trim() : '';
      const type = form.getAttribute('data-lead-form') || 'lamina';
      const extra = email ? `Mi mail es: ${email}` : '';
      window.open(whatsappLink(type, extra), '_blank', 'noopener,noreferrer');
    });
  });
}

function setupHotmartPlaceholders() {
  document.querySelectorAll('[data-hotmart-placeholder]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const checkoutUrl = button.getAttribute('data-checkout-url');
      if (!checkoutUrl || checkoutUrl === '#') {
        event.preventDefault();
        window.open(whatsappLink('curso'), '_blank', 'noopener,noreferrer');
        return;
      }

      button.setAttribute('href', checkoutUrl);
      button.setAttribute('target', '_blank');
      button.setAttribute('rel', 'noopener noreferrer');
    });
  });
}

function setupAnalyticsPlaceholders() {
  /*
    Lugar preparado para integrar:
    - Google Analytics 4.
    - Meta Pixel.
    - Eventos de clic en WhatsApp.
    - Eventos de inscripción al curso.
  */
}

window.addEventListener('DOMContentLoaded', () => {
  setWhatsappLinks();
  setupMenu();
  setupActiveNav();
  setupReveal();
  setupSliders();
  setupLeadForms();
  setupHotmartPlaceholders();
  setupAnalyticsPlaceholders();
});
