const body = document.body;
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const panel = document.querySelector('.mobile-panel');

// Homepage title — company introduction
document.title = '红薏米&柚信使｜公司介绍';
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) heroTitle.innerHTML = '红薏米&柚信使<br /><span>公司介绍</span>';

function installPortfolioImages() {
  const portfolio = document.querySelector('#portfolio');
  if (!portfolio) return;

  const makeImage = (slot, src, alt, ratio) => {
    if (!slot) return;
    slot.innerHTML = `<img src="${src}" alt="${alt}" loading="lazy" decoding="async">`;
    slot.style.minHeight = '0';
    slot.style.aspectRatio = ratio;
    slot.style.overflow = 'hidden';
    slot.style.border = '0';
    slot.style.background = '#dce1e5';
    const image = slot.querySelector('img');
    if (image) {
      image.style.width = '100%';
      image.style.height = '100%';
      image.style.display = 'block';
      image.style.objectFit = 'cover';
      image.style.objectPosition = 'center';
    }
  };

  makeImage(
    portfolio.querySelector('.portfolio-feature .media-placeholder.large'),
    'assets/ip/ip_jiaqing_cover.webp',
    '《嘉庆君游台湾》主视觉',
    '3 / 2'
  );

  const cardImages = [
    ['assets/ip/ip_wuhan_dialect_cover.webp', '武汉方言系列'],
    ['assets/ip/ip_chen_yuangguang_cover.webp', '《开漳圣王 陈元光》'],
    ['assets/ip/ip_zheng_chenggong_cover.webp', '《郑成功 潮武王》'],
    ['assets/ip/ip_youxinshi_cover.webp', '《柚信使》']
  ];

  portfolio.querySelectorAll('.asset-card .media-placeholder').forEach((slot, index) => {
    const item = cardImages[index];
    if (!item) return;
    makeImage(slot, item[0], item[1], '5 / 4');
  });
}

installPortfolioImages();

function installCopyrightSection() {
  const portfolio = document.querySelector('#portfolio');
  const traction = document.querySelector('#traction');
  if (!portfolio || !traction || document.querySelector('#copyright')) return;

  const section = document.createElement('section');
  section.className = 'copyright-assets section-dark';
  section.id = 'copyright';

  const cards = Array.from({ length: 16 }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');
    const imagePath = `assets/copyright/copyright_${number}.webp`;
    return `<button class="cert-card cert-card-real" type="button" data-cert-zoom data-cert-src="${imagePath}" data-cert-number="${number}" aria-label="放大查看版权证书 ${number}">
      <div class="cert-image">
        <img src="${imagePath}" alt="版权证书 ${number}" loading="lazy" decoding="async">
      </div>
      <div class="cert-meta"><b>版权证书 ${number}</b><span>作品登记证书 · 已确权</span></div>
    </button>`;
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
        <p>首批展示 16 项证书资产。后续可持续补充完整版权档案。</p>
      </div>
      <div class="certificate-grid reveal">${cards}</div>
    </div>
    <div class="certificate-modal" aria-hidden="true">
      <button class="certificate-modal-close" type="button" aria-label="关闭证书大图">×</button>
      <div class="certificate-modal-inner">
        <img class="certificate-modal-image" src="" alt="版权证书大图">
        <p class="certificate-modal-caption">作品登记证书 · 已确权</p>
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
  const modalImage = section.querySelector('.certificate-modal-image');
  const modalCaption = section.querySelector('.certificate-modal-caption');

  const openModal = (card) => {
    const src = card?.dataset.certSrc;
    const number = card?.dataset.certNumber;
    if (!src || !modal || !modalImage) return;
    modalImage.src = src;
    modalImage.alt = `版权证书 ${number || ''}`.trim();
    if (modalCaption) modalCaption.textContent = `版权证书 ${number || ''} · 已确权`.trim();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
  };

  const closeModal = () => {
    modal?.classList.remove('is-open');
    modal?.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
  };

  section.querySelectorAll('[data-cert-zoom]').forEach((card) => {
    card.addEventListener('click', () => openModal(card));
  });
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
