function installCompanyNewsSection() {
  const data = window.COMPANY_NEWS;
  const team = document.querySelector('#team');
  if (!data?.items?.length || !team || document.querySelector('#news')) return;

  const featured = data.items.find((item) => item.featured) || data.items[0];
  const cards = data.items.filter((item) => item !== featured).map((item) => `
    <article class="news-card">
      <img class="news-card-image" src="${item.image}" alt="${item.title}" loading="lazy" decoding="async">
      <div class="news-card-body">
        <div class="news-meta"><time>${item.date}</time><span>${item.type}</span></div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
    </article>`).join('');

  const section = document.createElement('section');
  section.className = 'company-news section-muted';
  section.id = 'news';
  section.innerHTML = `
    <div class="container">
      <div class="section-title-row reveal is-visible">
        <div><span class="eyebrow">COMPANY NEWS</span><h2>公司新闻</h2></div>
        <p>记录红薏米 × 柚信使在媒体报道、两岸交流、项目落地与产业合作中的阶段成果。</p>
      </div>

      <article class="news-featured reveal is-visible">
        <img class="news-featured-image" src="${featured.image}" alt="${featured.title}" decoding="async">
        <div class="news-featured-copy">
          <div class="news-meta"><time>${featured.date}</time><span>${featured.type}</span></div>
          <span class="news-featured-label">FEATURED NEWS</span>
          <h3>${featured.title}</h3>
          <p>${featured.text}</p>
        </div>
      </article>

      <div class="news-grid reveal is-visible">${cards}</div>
    </div>`;

  team.parentNode.insertBefore(section, team);

  document.querySelectorAll('.desktop-nav a[href="#team"], .mobile-panel a[href="#team"]').forEach((link) => {
    if (link.parentNode.querySelector('a[href="#news"]')) return;
    const newsLink = document.createElement('a');
    newsLink.href = '#news';
    newsLink.textContent = '公司新闻';
    link.insertAdjacentElement('beforebegin', newsLink);
  });
}

async function installVisitCounter() {
  const footer = document.querySelector('.footer-inner');
  if (!footer || document.querySelector('#siteVisitCounter')) return;

  const box = document.createElement('div');
  box.className = 'visit-counter';
  box.id = 'siteVisitCounter';
  box.title = '同一网络来源 30 分钟内重复访问只计一次';
  box.innerHTML = '<span>累计访客</span><strong>—</strong><small>30分钟去重</small>';
  footer.insertBefore(box, footer.querySelector('a[href="#top"]'));

  try {
    const response = await fetch('https://dyttbfkrhgsaealsyfbl.supabase.co/functions/v1/site-visit-counter', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: '{}'
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    const count = Number(result.count);
    if (!Number.isFinite(count)) throw new Error('Invalid counter response');
    box.querySelector('strong').textContent = count.toLocaleString('zh-CN');
  } catch (error) {
    console.warn('Visitor counter unavailable:', error);
    box.classList.add('is-error');
    box.querySelector('strong').textContent = '—';
  }
}

installCompanyNewsSection();
installVisitCounter();
