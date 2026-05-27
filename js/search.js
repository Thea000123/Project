    /* ── Filter accordion ── */
    document.querySelectorAll('.filter-header').forEach(header => {
      header.addEventListener('click', () => {
        header.parentElement.classList.toggle('active');
        header.setAttribute('aria-expanded', header.parentElement.classList.contains('active'));
      });
      header.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); header.click(); } });
    });
    /* Open first group by default */
    document.querySelector('.filter-group')?.classList.add('active');

    /* ── Products data ── */
    const ALL_PRODUCTS = [
      { id:3, title:'TURTLE MINI COLOURED',   price:215.0,  image:'../images/image 17.png', material:'Cast Marble' },
      { id:3, title:'TURTLE MARBLE',           price:585.0,  image:'../images/image 18.png', material:'Cast Marble' },
      { id:3, title:'TURTLE 14 CARAT',         price:3850.0, image:'../images/image 19.png', material:'Natural Marble' },
      { id:3, title:'TURTLE RELIEF',           price:215.0,  image:'../images/image 20.png', material:'Alloy' },
      { id:3, title:'TURTLE ALLOY',            price:585.0,  image:'../images/image 27.png', material:'Alloy' },
      { id:3, title:'TURTLE MINI AQUA',        price:215.0,  image:'../images/image 28.png', material:'Cast Marble' },
      { id:3, title:'TURTLE COLOURED',         price:415.0,  image:'../images/image 29.png', material:'Cast Marble' },
      { id:3, title:'TURTLE GOLD BRONZE',      price:445.0,  image:'../images/image 30.png', material:'Bronze' },
      { id:3, title:'TURTLE JADE CAST',        price:415.0,  image:'../images/image 31.png', material:'Cast Marble' },
      { id:3, title:'FISH CORAL TROUT',        price:825.0,  image:'../images/image 17.png', material:'Bronze', detailUrl:'product-detail-2.html' },
      { id:3, title:'WHALE HUMPBACK MINI',     price:320.0,  image:'../images/image 18.png', material:'Cast Marble' },
      { id:3, title:'MANTA RAY MINI',          price:210.0,  image:'../images/image 19.png', material:'Alloy' },
    ].map((p, i) => ({ ...p, uid: i + 1 }));

    const PER_PAGE = 6;
    let curPage = 1;
    let shown = [...ALL_PRODUCTS];

    function renderGrid() {
      const grid = document.getElementById('product-grid');
      if (!grid) return;
      const slice = shown.slice((curPage - 1) * PER_PAGE, curPage * PER_PAGE);
      if (slice.length === 0) {
        grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#64748b;padding:2rem;">No products found.</p>';
        return;
      }
      grid.innerHTML = slice.map((p, i) => `
        <article class="prod-card" style="animation-delay:${i * .06}s"
          onclick="window.location.href='${p.detailUrl || 'product-detail-1.html'}'"
          role="listitem" tabindex="0" aria-label="${p.title}">
          <div class="prod-card-img"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>
          <div class="prod-card-name">${p.title}</div>
          <div class="prod-card-price">$${p.price.toFixed(2)}</div>
          <button class="prod-cart-btn"
            onclick="event.stopPropagation();CartUtils&&CartUtils.addToCart({id:${p.id},title:'${p.title.replace(/'/g,"\\'")}',price:${p.price},image:'${p.image}'});Toast&&Toast.show('Added to cart','success')"
            aria-label="Add ${p.title} to cart">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </button>
        </article>`).join('');
    }

    function totalPages() { return Math.max(1, Math.ceil(shown.length / PER_PAGE)); }

    function refreshPager() {
      const tp = totalPages();
      document.getElementById('pg-prev').disabled = curPage <= 1;
      document.getElementById('pg-next').disabled = curPage >= tp;
      document.querySelectorAll('.pg-num').forEach(el => el.classList.toggle('active', +el.dataset.page === curPage));
    }

    function goTo(p) {
      curPage = Math.max(1, Math.min(totalPages(), p));
      renderGrid(); refreshPager();
    }

    document.getElementById('pg-prev').addEventListener('click', () => goTo(curPage - 1));
    document.getElementById('pg-next').addEventListener('click', () => goTo(curPage + 1));
    document.querySelectorAll('.pg-num').forEach(el => el.addEventListener('click', () => goTo(+el.dataset.page)));

    /* Inline search filter */
    document.getElementById('inline-search-input').addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      shown = q ? ALL_PRODUCTS.filter(p => p.title.toLowerCase().includes(q) || p.material.toLowerCase().includes(q)) : [...ALL_PRODUCTS];
      curPage = 1; renderGrid(); refreshPager();
    });

    /* Filter reset */
    document.getElementById('filter-reset').addEventListener('click', () => {
      document.querySelectorAll('.filter-option input').forEach(cb => cb.checked = false);
      shown = [...ALL_PRODUCTS]; curPage = 1; renderGrid(); refreshPager();
    });

    /* Filter apply */
    document.getElementById('filter-apply').addEventListener('click', () => {
      const prices    = [...document.querySelectorAll('input[name=price]:checked')].map(c => c.value);
      const materials = [...document.querySelectorAll('input[name=material]:checked')].map(c => c.value);
      shown = ALL_PRODUCTS.filter(p => {
        const priceOk = prices.length === 0 || prices.some(r => {
          const [lo, hi] = r === '1000+' ? [1000, Infinity] : r.split('-').map(Number);
          return p.price >= lo && p.price <= hi;
        });
        const matOk = materials.length === 0 || materials.includes(p.material);
        return priceOk && matOk;
      });
      curPage = 1; renderGrid(); refreshPager();
    });

    renderGrid(); refreshPager();
