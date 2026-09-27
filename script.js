const body = document.body;
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const panel = document.querySelector('.mobile-panel');

function installCopyrightSection() {
  const portfolio = document.querySelector('#portfolio');
  const traction = document.querySelector('#traction');
  if (!portfolio || !traction || document.querySelector('#copyright')) return;

  const section = document.createElement('section');
  section.className = 'copyright-assets section-dark';
  section.id = 'copyright';

  const cards = Array.from({ length: 15 }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');
    if (index === 0) {
      return `<button class="cert-card cert-card-real" type="button" data-cert-zoom aria-label="放大查看版权证书 01">
        <div class="cert-image cert-image-real" role="img" aria-label="作品登记证书示例"></div>
        <div class="cert-meta"><b>版权证书 01</b><span>作品登记证书 · 已确权</span></div>
      </button>`;
    }
    return `<article class="cert-card cert-placeholder">
      <div class="cert-placeholder-art"><span>版权证书</span><strong>${number}</strong><small>CERTIFICATE PLACEHOLDER</small></div>
      <div class="cert-meta"><b>版权证书 ${number}</b><span>待替换正式证书图</span></div>
    </article>`;
  }).join('');

  section.innerHTML = `
    <div class="container">
      <div class="copyright-hero reveal">
        <div class="copyright-stat">
          <span class="eyebrow light">COPYRIGHT ASSETS</span>
          <strong>40+</strong>
          <small>已取得著作权证书</small>
        </div>
        <div class="copyright-copy">
          <h2>版权资产沉淀</h2>
          <p>累计取得 40 余项著作权证书，全部 IP 具备完整可商用版权，形成可持续内容开发、IP 授权、品牌联名与商业变现的核心数字资产。</p>
          <div class="copyright-tags"><span>原创确权</span><span>可商用</span><span>可授权</span><span>可持续开发</span></div>
        </div>
      </div>
      <div class="certificate-head reveal">
        <div><span>ASSET PROOF</span><h3>部分著作权证书展示</h3></div>
        <p>首批展示 15 项证书资产。后续可持续补充完整版权档案。</p>
      </div>
      <div class="certificate-grid reveal">${cards}</div>
    </div>
    <div class="certificate-modal" aria-hidden="true">
      <button class="certificate-modal-close" type="button" aria-label="关闭证书大图">×</button>
      <div class="certificate-modal-inner">
        <div class="certificate-modal-image cert-image-real" role="img" aria-label="作品登记证书大图"></div>
        <p>作品登记证书 · 版权资产示例</p>
      </div>
    </div>`;

  traction.parentNode.insertBefore(section, traction);

  document.querySelectorAll('.desktop-nav a[href="#portfolio"], .mobile-panel a[href="#portfolio"]').forEach((link) => {
    if (link.parentNode.querySelector('a[href="#copyright"]')) return;
    const copyrightLink = document.createElement('a');
    copyrightLink.href = '#copyright';
    copyrightLink.textContent = '版权资产';
    link.insertAdjacentElement('afterend', copyrightLink);
  });

  const modal = section.querySelector('.certificate-modal');
  const openModal = () => {
    modal?.classList.add('is-open');
    modal?.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
  };
  const closeModal = () => {
    modal?.classList.remove('is-open');
    modal?.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
  };
  section.querySelector('[data-cert-zoom]')?.addEventListener('click', openModal);
  section.querySelector('.certificate-modal-close')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });
}

installCopyrightSection();

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
