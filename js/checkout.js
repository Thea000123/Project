    /* ── Checkout page logic ── */
    document.addEventListener('DOMContentLoaded', () => {

      /* Populate order summary */
      function updateSummary() {
        const items = cart.getItems();
        const container = document.getElementById('checkout-items');
        const totalEl   = document.getElementById('checkout-total');
        const display   = items.length > 0 ? items : [
          { title: 'TURTLE Coloured Cast Marble', quantity: 1, price: 585 },
          { title: 'FISH CORAL TROUT Red Cast Marble', quantity: 1, price: 825 }
        ];
        const subtotal = items.length > 0 ? cart.getTotalPrice() : 1410;

        if (container) {
          container.innerHTML = display.map(item => `
            <div class="co-order-item">
              <div class="co-order-item-name">${item.title}</div>
              <div class="co-order-item-sub">
                <span>&times;${item.quantity || 1}</span>
                <span class="co-order-item-price">$${((item.price) * (item.quantity || 1)).toLocaleString('en-AU', {minimumFractionDigits:2})}</span>
              </div>
            </div>`).join('');
        }
        if (totalEl) totalEl.textContent = '$' + subtotal.toLocaleString('en-AU', {minimumFractionDigits:2});
      }
      updateSummary();

      /* Payment method toggles card opacity */
      document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', () => {
          const cardBox = document.getElementById('card-fields');
          if (cardBox) {
            const showCard = ['credit_card', 'bank_transfer'].includes(radio.value);
            cardBox.style.opacity = showCard ? '1' : '0.4';
            cardBox.style.pointerEvents = showCard ? '' : 'none';
          }
          const errEl = document.getElementById('payment-error');
          if (errEl) errEl.style.display = 'none';
        });
      });

      /* Card number formatting */
      const cardInput = document.getElementById('cardNumber');
      if (cardInput) {
        cardInput.addEventListener('input', () => {
          let v = cardInput.value.replace(/\D/g, '').slice(0, 16);
          cardInput.value = v.replace(/(.{4})/g, '$1 ').trim();
        });
      }

      /* Expiry formatting */
      const expiryInput = document.getElementById('expiry');
      if (expiryInput) {
        expiryInput.addEventListener('input', () => {
          let v = expiryInput.value.replace(/\D/g, '').slice(0, 4);
          if (v.length >= 2) v = v.slice(0, 2) + ' / ' + v.slice(2);
          expiryInput.value = v;
        });
      }

      /* Save account */
      document.getElementById('save-account-btn')?.addEventListener('click', () => {
        const data = { firstName: document.getElementById('firstName')?.value || '', lastName: document.getElementById('lastName')?.value || '', address: document.getElementById('address')?.value || '', phone: document.getElementById('phone')?.value || '', email: document.getElementById('email')?.value || '', country: document.getElementById('country')?.value || '' };
        try { localStorage.setItem('saved-account', JSON.stringify(data)); } catch(e) {}
        Toast.show('Account details saved!', 'success');
      });

      /* Import address */
      document.getElementById('import-addr-btn')?.addEventListener('click', () => {
        try {
          const saved = JSON.parse(localStorage.getItem('saved-account') || 'null');
          if (saved?.address) document.getElementById('address').value = saved.address;
        } catch(e) {}
      });

      /* Restore saved account */
      try {
        const saved = JSON.parse(localStorage.getItem('saved-account') || 'null');
        if (saved) {
          ['firstName','lastName','address','phone','email'].forEach(id => {
            const el = document.getElementById(id);
            if (el && saved[id]) el.value = saved[id];
          });
          const cEl = document.getElementById('country');
          if (cEl && saved.country) cEl.value = saved.country;
        }
      } catch(e) {}

      /* Form validation & submission */
      document.getElementById('checkout-form').addEventListener('submit', e => {
        e.preventDefault();
        let valid = true;

        /* Required text fields */
        ['firstName','lastName','address','phone','email'].forEach(id => {
          const el = document.getElementById(id);
          const err = document.getElementById('err-' + id);
          if (!el || !el.value.trim()) {
            if (el) el.classList.add('error');
            if (err) err.style.display = 'block';
            valid = false;
          } else {
            if (el) el.classList.remove('error');
            if (err) err.style.display = 'none';
          }
        });

        /* Email format */
        const emailEl = document.getElementById('email');
        if (emailEl && emailEl.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) {
          emailEl.classList.add('error');
          const err = document.getElementById('err-email');
          if (err) err.style.display = 'block';
          valid = false;
        }

        /* Payment method */
        const pmChecked = document.querySelector('input[name="paymentMethod"]:checked');
        if (!pmChecked) {
          const errEl = document.getElementById('payment-error');
          if (errEl) errEl.style.display = 'block';
          Toast.show('Please select a payment method', 'error');
          valid = false;
        }

        if (!valid) { Toast.show('Please fill in all required fields', 'error'); return; }

        /* Submit */
        const orderData = {
          orderNumber: 'ORD-' + Date.now().toString().slice(-8),
          email: emailEl?.value || '',
          items: cart.getItems(),
          total: cart.getTotalPrice(),
          date: new Date().toLocaleDateString('en-AU')
        };
        try { sessionStorage.setItem('order-data', JSON.stringify(orderData)); } catch(e) {}

        const btn = document.querySelector('.co-place-order-btn');
        if (btn) { btn.disabled = true; btn.textContent = 'Processing...'; }
        Toast.show('Order submitted! Redirecting…', 'success');
        cart.clearCart();
        setTimeout(() => { window.location.href = 'success.html'; }, 1500);
      });

      /* Remove error class on input */
      document.querySelectorAll('.co-input').forEach(el => {
        el.addEventListener('input', () => {
          el.classList.remove('error');
          const errId = 'err-' + el.id;
          const errEl = document.getElementById(errId);
          if (errEl) errEl.style.display = 'none';
        });
      });
    });
