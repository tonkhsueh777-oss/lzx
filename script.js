const body = document.body;
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const panel = document.querySelector('.mobile-panel');

function closeMenu() {
  body.classList.remove('menu-open');
  toggle?.setAttribute('aria-expanded', 'false');
  panel?.setAttribute('aria-hidden', 'true');
}

toggle?.addEventListener('click', () => {
  const open = !body.classList.contains('menu-open');
  body.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  panel?.setAttribute('aria-hidden', String(!open));
});

document.querySelectorAll('.mobile-panel a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion) {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px' });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 980) closeMenu();
});
