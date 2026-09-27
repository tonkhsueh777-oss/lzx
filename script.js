const body = document.body;
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

document.querySelectorAll('.mobile-panel a').forEach((link) => link.addEventListener('click', closeMenu));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const toast = document.querySelector('.toast');
let toastTimer;
document.querySelectorAll('[data-video-placeholder]').forEach((button) => {
  button.addEventListener('click', () => {
    toast?.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast?.classList.remove('show'), 1800);
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 820) closeMenu();
});
