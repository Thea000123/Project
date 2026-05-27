    (function () {
      const CURRENT_PRODUCT = {
        id: 101, title: "FISH CORAL TROUT", price: 825.0, image: "../images/image 17.png"
      };

      const GALLERY_IMAGES = [
        '../images/image 32 (4).png',
        '../images/image 32 (5).png',
        '../images/image 32 (6).png'
      ];
      let currentImgIdx = 0;

      function switchGalleryImage(idx, animate) {
        animate = (animate === undefined) ? true : animate;
        const img    = document.getElementById('pd-main-img');
        const thumbs = document.querySelectorAll('.pd-thumb');
        currentImgIdx = (idx + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
        if (animate) {
          img.classList.add('fade');
          setTimeout(() => { img.src = GALLERY_IMAGES[currentImgIdx]; img.classList.remove('fade'); }, 200);
        } else {
          img.src = GALLERY_IMAGES[currentImgIdx];
        }
        thumbs.forEach((t, i) => t.classList.toggle('active', i === currentImgIdx));
      }

      document.querySelectorAll('.pd-thumb').forEach((btn, i) => {
        btn.addEventListener('click', () => switchGalleryImage(i));
      });
      document.getElementById('gallery-prev').addEventListener('click', () => switchGalleryImage(currentImgIdx - 1));
      document.getElementById('gallery-next').addEventListener('click', () => switchGalleryImage(currentImgIdx + 1));
      document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft')  switchGalleryImage(currentImgIdx - 1);
        if (e.key === 'ArrowRight') switchGalleryImage(currentImgIdx + 1);
      });

      const qtyInput = document.getElementById('qty-input');
      document.getElementById('qty-minus').addEventListener('click', () => {
        const v = parseInt(qtyInput.value) || 1;
        if (v > 1) qtyInput.value = v - 1;
      });
      document.getElementById('qty-plus').addEventListener('click', () => {
        qtyInput.value = (parseInt(qtyInput.value) || 1) + 1;
      });
      qtyInput.addEventListener('change', () => {
        let v = parseInt(qtyInput.value);
        if (isNaN(v) || v < 1) v = 1;
        if (v > 99) v = 99;
        qtyInput.value = v;
      });

      document.getElementById('btn-add-cart').addEventListener('click', () => {
        const qty = parseInt(qtyInput.value) || 1;
        for (let i = 0; i < qty; i++) CartUtils.addToCart(CURRENT_PRODUCT);
        Toast.show('Added ' + qty + ' × ' + CURRENT_PRODUCT.title + ' to cart', 'success', {
          action: { label: 'View Cart', href: 'cart.html' }
        });
      });

      document.getElementById('btn-buy').addEventListener('click', () => {
        const qty = parseInt(qtyInput.value) || 1;
        for (let i = 0; i < qty; i++) CartUtils.addToCart(CURRENT_PRODUCT);
        Toast.show('Redirecting to checkout…', 'success');
        setTimeout(() => { window.location.href = 'checkout.html'; }, 700);
      });

      document.querySelectorAll('.pd-acc-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const item = btn.parentElement;
          const isOpen = item.classList.contains('open');
          document.querySelectorAll('.pd-acc-item').forEach(i => i.classList.remove('open'));
          if (!isOpen) item.classList.add('open');
        });
      });

      const RELATED = [
        { id: 7, title: "FISH MANGROVE",      price: 1450.0, image: "../images/image 35 (2).png" },
        { id: 1, title: "FISH GUPPY RELIEF", price: 395.0, image: "../images/image 36.png" },
        { id: 4, title: "FISH BUTTERFLY RELIEF",        price: 195.0, image: "../images/image 37 (1).png" },
        { id: 5, title: "FISH MANGROVE JACK",         price: 1450.0, image: "../images/image 38 (2).png" }
      ];

      document.getElementById('related-grid').innerHTML = RELATED.map(p => `
        <article class="pd-rel-card" onclick="window.location.href='product-detail-1.html'" role="button" tabindex="0"
          onkeydown="if(event.key==='Enter')window.location.href='product-detail-1.html'">
          <div class="pd-rel-img"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>
          <div class="pd-rel-name">${p.title}</div>
          <div class="pd-rel-price">$${p.price.toFixed(2)}</div>
          <button class="pd-rel-cart-btn"
            onclick="event.stopPropagation();CartUtils&&CartUtils.addToCart(${JSON.stringify(p).replace(/"/g,'&quot;')});Toast&&Toast.show('${p.title} added','success')"
            aria-label="Add ${p.title} to cart">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </button>
        </article>
      `).join('');
    })();
