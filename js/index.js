    /* ── Pagination ── */
    (function () {
      const TOTAL = 3;
      let cur = 1;
      function show(n) {
        n = Math.max(1, Math.min(TOTAL, n));
        cur = n;
        for (let i = 1; i <= TOTAL; i++) {
          const g = document.getElementById('pg-' + i);
          if (g) g.style.display = i === n ? 'grid' : 'none';
        }
        document.querySelectorAll('.pg-num').forEach(el => el.classList.toggle('active', +el.dataset.page === n));
      }
      document.querySelectorAll('.pg-num').forEach(el => el.addEventListener('click', () => show(+el.dataset.page)));
      document.getElementById('pg-prev').addEventListener('click', () => show(cur - 1));
      document.getElementById('pg-next').addEventListener('click', () => show(cur + 1));
      show(1);
    })();

    /* ── Product card click → detail page ── */
    document.querySelectorAll('.product-card').forEach(card => {
      const goToDetail = () => {
        const name  = card.querySelector('.card-name')?.textContent.trim() || '';
        const price = (card.querySelector('.card-price')?.textContent || '').replace(/[^0-9.]/g, '');
        const img   = card.querySelector('img')?.getAttribute('src') || '';
        if (name.toUpperCase() === 'FISH CORAL TROUT') { window.location.href = 'product-detail-2.html'; return; }
        const q = new URLSearchParams({ title: name, price: price, img: img });
        window.location.href = 'product-detail-1.html?' + q.toString();
      };
      card.addEventListener('click', goToDetail);
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.addEventListener('keydown', e => { if (e.key === 'Enter') goToDetail(); });
    });
    (function () {
      function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const dur = 1800, fps = 60, step = target / (dur / (1000 / fps));
        let cur = 0;
        function tick() {
          cur += step;
          if (cur >= target) { el.textContent = target + suffix; return; }
          el.textContent = Math.floor(cur) + suffix;
          requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            animateCounter(e.target);
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      document.querySelectorAll('.stat-number[data-target]').forEach(el => obs.observe(el));
    })();
