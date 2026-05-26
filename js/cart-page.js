    function renderCartUI() {
      const items = cart.getItems();
      const cartEl = document.getElementById('cart-items');
      const checkoutBtn = document.getElementById('checkout-btn');

      if (!items.length) {
        cartEl.innerHTML = `
          <div class="cart-empty">
            <div class="cart-empty-icon">🛒</div>
            <div class="cart-empty-title">Your cart is empty</div>
            <p class="cart-empty-text">Browse our collection and add some pieces you love.</p>
            <a href="page1-marine.html" style="background:#0f172a;color:#fff;padding:12px 28px;border-radius:10px;font-size:14px;font-weight:600;display:inline-block;">Browse Collection</a>
          </div>`;
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = '.5';
        document.getElementById('cart-item-count').textContent = 'Subtotal (0 items)';
        document.getElementById('cart-subtotal').textContent = '$0.00';
        document.getElementById('cart-total').textContent = '$0.00';
        return;
      }

      cartEl.innerHTML = items.map(item => `
        <article class="cart-item" data-id="${item.id}">
          <div class="cart-item-img"><img src="${item.image}" alt="${item.title}" loading="lazy"></div>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.title}</div>
            <div class="cart-item-subtitle">Cast Sculpture · Australia Made</div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          </div>
          <div class="cart-item-actions">
            <div class="cart-qty-control">
              <button class="cart-qty-btn qty-minus" data-id="${item.id}" aria-label="Decrease quantity">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <span class="cart-qty-num">${item.quantity}</span>
              <button class="cart-qty-btn qty-plus" data-id="${item.id}" aria-label="Increase quantity">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
            <button class="cart-remove-btn" data-id="${item.id}" aria-label="Remove ${item.title}">Remove</button>
          </div>
        </article>`).join('');

      // Bind qty and remove buttons
      cartEl.querySelectorAll('.qty-minus').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = +btn.dataset.id;
          const item = cart.getItems().find(i => i.id === id);
          if (item && item.quantity > 1) { cart.updateQuantity(id, item.quantity - 1); renderCartUI(); }
          else { cart.removeItem(id); renderCartUI(); }
        });
      });
      cartEl.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = +btn.dataset.id;
          const item = cart.getItems().find(i => i.id === id);
          if (item) { cart.updateQuantity(id, item.quantity + 1); renderCartUI(); }
        });
      });
      cartEl.querySelectorAll('.cart-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => { cart.removeItem(+btn.dataset.id); renderCartUI(); });
      });

      const totalQty = items.reduce((s, i) => s + i.quantity, 0);
      const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
      document.getElementById('cart-item-count').textContent = `Subtotal (${totalQty} item${totalQty !== 1 ? 's' : ''})`;
      document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
      document.getElementById('cart-total').textContent = `$${subtotal.toFixed(2)}`;
      checkoutBtn.disabled = false;
      checkoutBtn.style.opacity = '1';

      if (typeof CartUtils !== 'undefined') CartUtils.updateCartBadge();
    }

    document.addEventListener('DOMContentLoaded', renderCartUI);
