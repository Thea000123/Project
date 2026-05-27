
    (function () {
      const MARINE_PRODUCTS = [
        { id: 101, title: 'FISH CORAL TROUT',            price: 825,  image: '../images/image 17.png', detailUrl: 'product-detail-2.html' },
        { id: 102, title: 'DOLPHIN MOTHER AND CALF MINI', price: 365,  image: '../images/image 18.png' },
        { id: 103, title: 'TURTLE GOLD BRONZE',           price: 445,  image: '../images/image 19.png' },
        { id: 104, title: 'WHALE HUMPBACK MINI',          price: 320,  image: '../images/image 20.png' },
        { id: 105, title: 'FISH BARRAMUNDI STUDY',        price: 535,  image: '../images/image 27.png' },
        { id: 106, title: 'TURTLE SLEEPY MARBLE',         price: 2695, image: '../images/image 28.png' },
        { id: 107, title: 'FISH BARRAMUNDI',              price: 725,  image: '../images/image 29.png' },
        { id: 108, title: 'MANTA RAY MINI',               price: 210,  image: '../images/image 30.png' },
        { id: 109, title: 'FISH CORAL TROUT II',          price: 825,  image: '../images/image 17.png' },
        { id: 110, title: 'DOLPHIN MINI',                 price: 365,  image: '../images/image 18.png' },
        { id: 111, title: 'TURTLE BRONZE',                price: 445,  image: '../images/image 19.png' },
        { id: 112, title: 'WHALE SONG',                   price: 320,  image: '../images/image 20.png' },
        { id: 113, title: 'BARRAMUNDI CAST',              price: 535,  image: '../images/image 27.png' },
        { id: 114, title: 'TURTLE MARBLE LARGE',          price: 2695, image: '../images/image 28.png' },
        { id: 115, title: 'BARRAMUNDI GOLD',              price: 725,  image: '../images/image 29.png' },
        { id: 116, title: 'MANTA RAY LARGE',              price: 380,  image: '../images/image 30.png' },
      ];

      const PER_PAGE = 8;
      let currentPage = 1;
      const totalPages = Math.ceil(MARINE_PRODUCTS.length / PER_PAGE);

      function fmt(p) { return '$' + p.toLocaleString('en-AU', { minimumFractionDigits: 2 }); }

      function renderGrid(page) {
        const grid = document.getElementById('product-grid');
        const items = MARINE_PRODUCTS.slice((page - 1) * PER_PAGE, page * PER_PAGE);
        grid.innerHTML = items.map(p => `
          <article class="product-card" role="listitem"
            data-id="${p.id}" data-title="${p.title}" data-price="${p.price}" data-image="${p.image}"
            onclick="window.location.href='${p.detailUrl || 'product-detail-1.html'}'">
            <div class="product-image"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>
            <button class="cart-btn" aria-label="Add ${p.title} to cart">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            </button>
            <div class="product-info">
              <div class="product-title">${p.title}</div>
              <div class="product-price">${fmt(p.price)}</div>
            </div>
          </article>`).join('');

        grid.querySelectorAll('.cart-btn').forEach(btn => {
          btn.addEventListener('click', e => {
            e.stopPropagation();
            const card = btn.closest('.product-card');
            CartUtils.addToCart({ id: +card.dataset.id, title: card.dataset.title, price: +card.dataset.price, image: card.dataset.image });
            Toast.show(card.dataset.title + ' added to cart', 'success');
          });
        });
      }

      function updatePager(page) {
        document.querySelectorAll('.page-num').forEach(el => el.classList.toggle('active', +el.dataset.page === page));
        document.getElementById('pg-prev').classList.toggle('disabled', page === 1);
        document.getElementById('pg-next').classList.toggle('disabled', page === totalPages);
      }

      function goTo(page) {
        if (page < 1 || page > totalPages) return;
        currentPage = page;
        renderGrid(currentPage);
        updatePager(currentPage);
      }

      window.addEventListener('load', () => {
        renderGrid(1); updatePager(1);
        document.getElementById('pg-prev').addEventListener('click', () => goTo(currentPage - 1));
        document.getElementById('pg-next').addEventListener('click', () => goTo(currentPage + 1));
        document.querySelectorAll('.page-num').forEach(el => el.addEventListener('click', () => goTo(+el.dataset.page)));
      });
    })();
  