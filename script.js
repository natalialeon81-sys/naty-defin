// Menú móvil accesible
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  menuToggle.textContent = isOpen ? '×' : '☰';
});
mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) { menuToggle.textContent = '☰'; menuToggle.setAttribute('aria-label', 'Abrir menú'); }
}));

// Filtros para separar Imagen Escrita e ilustraciones
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.classList.remove('selected'));
  button.classList.add('selected');
  const filter = button.dataset.filter;
  projectCards.forEach(card => {
    card.hidden = !(filter === 'all' || card.dataset.category === filter);
  });
}));

// Vista ampliada de cada imagen
const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('p');
document.querySelectorAll('.artwork-button').forEach(button => button.addEventListener('click', () => {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;
  lightboxImage.src = button.dataset.full;
  lightboxImage.alt = button.dataset.title || 'Obra ampliada';
  lightboxCaption.textContent = button.dataset.title || '';
  lightbox.showModal();
}));
lightbox?.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });

// Cursor flotante con el león: solo en computadores con mouse
const lionCursor = document.querySelector('.lion-cursor');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
if (lionCursor && finePointer.matches) {
  document.body.classList.add('no-cursor');
  window.addEventListener('mousemove', event => {
    lionCursor.style.left = `${event.clientX}px`;
    lionCursor.style.top = `${event.clientY}px`;
    lionCursor.style.opacity = '1';
  });
  document.addEventListener('mouseleave', () => { lionCursor.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { lionCursor.style.opacity = '1'; });
  document.querySelectorAll('a,button').forEach(element => {
    element.addEventListener('mouseenter', () => { lionCursor.style.transform = 'translate(-50%,-50%) scale(1.2) rotate(-8deg)'; });
    element.addEventListener('mouseleave', () => { lionCursor.style.transform = 'translate(-50%,-50%) scale(1) rotate(0)'; });
  });
}

// Resaltar en el menú la sección visible
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => observer.observe(section));
}
