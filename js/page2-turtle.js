
    (function () {
      const TURTLE_PRODUCTS = [
        { id: 201, title: 'TURTLE MINI COLOURED', price: 215,  image: '../images/image 17.png' },
        { id: 202, title: 'TURTLE MARBLE',         price: 585,  image: '../images/image 18.png' },
        { id: 203, title: 'TURTLE 14 CARAT',       price: 3850, image: '../images/image 19.png' },
        { id: 204, title: 'TURTLE MINI AQUA',      price: 215,  image: '../images/image 20.png' },
        { id: 205, title: 'TURTLE RELIEF',         price: 215,  image: '../images/image 27.png' },
        { id: 206, title: 'TURTLE ALLOY',          price: 585,  image: '../images/image 28.png' },
        { id: 207, title: 'TURTLE COLOURED',       price: 415,  image: '../images/image 29.png' },
        { id: 208, title: 'TURTLE JADE CAST',      price: 415,  image: '../images/image 30.png' },
        { id: 209, title: 'TURTLE MINI PAINTED',   price: 215,  image: '../images/image 17.png' },
        { id: 210, title: 'TURTLE NATURAL',        price: 585,  image: '../images/image 18.png' },
        { id: 211, title: 'TURTLE CARAT GOLD',     price: 3850, image: '../images/image 19.png' },
        { id: 212, title: 'TURTLE AQUA BLUE',      price: 215,  image: '../images/image 20.png' },
        { id: 213, title: 'TURTLE WALL RELIEF',    price: 215,  image: '../images/image 27.png' },
        { id: 214, title: 'TURTLE BRONZE ALLOY',   price: 585,  image: '../images/image 28.png' },
        { id: 215, title: 'TURTLE PAINTED CAST',   price: 415,  image: '../images/image 29.png' },
        { id: 216, title: 'TURTLE JADE GREEN',     price: 415,  image: '../images/image 30.png' },
      ];
      const PER_PAGE = 8;
      let currentPage = 1;
      const totalPages = Math.ceil(TURTLE_PRODUCTS.length / PER_PAGE);
      function fmt(p) { return '$' + p.toLocaleString('en-AU', { minimumFractionDigits: 2 }); }
      function renderGrid(page) {
        const grid = document.getElementById('product-grid');
        const items = TURTLE_PRODUCTS.slice((page - 1) * PER_PAGE, page * PER_PAGE);
        grid.innerHTML = items.map(p => `
          <article class="product-card" role="listitem"
            data-id="${p.id}" data-title="${p.title}" data-price="${p.price}" data-image="${p.image}"
            onclick="window.location.href='product-detail-1.html'">
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
        currentPage = page; renderGrid(currentPage); updatePager(currentPage);
      }
      window.addEventListener('load', () => {
        renderGrid(1); updatePager(1);
        document.getElementById('pg-prev').addEventListener('click', () => goTo(currentPage - 1));
        document.getElementById('pg-next').addEventListener('click', () => goTo(currentPage + 1));
        document.querySelectorAll('.page-num').forEach(el => el.addEventListener('click', () => goTo(+el.dataset.page)));
      });
    })();
  