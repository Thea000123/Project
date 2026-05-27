    document.addEventListener('DOMContentLoaded', () => {
      /* Primary source: sessionStorage written by checkout.html before cart was cleared */
      let orderData = null;
      try { orderData = JSON.parse(sessionStorage.getItem('order-data') || 'null'); } catch(e) {}

      const cartItems = (orderData && Array.isArray(orderData.items) && orderData.items.length)
        ? orderData.items : [];
      const total = (orderData && orderData.total) ? orderData.total : 0;

      /* Populate order number & email */
      const orderNumEl = document.getElementById('order-number');
      const emailEl    = document.getElementById('customer-email');
      if (orderData) {
        if (orderData.orderNumber && orderNumEl) {
          orderNumEl.textContent = '#' + orderData.orderNumber;
        }
        if (orderData.email && emailEl) {
          emailEl.textContent = orderData.email;
          emailEl.href = 'mailto:' + orderData.email;
        }
        if (orderData.date) {
          /* Optionally show order date if element exists */
          const dateEl = document.getElementById('order-date');
          if (dateEl) dateEl.textContent = orderData.date;
        }
      }

      /* Render order lines */
      const linesContainer = document.getElementById('order-lines');
      const totalEl        = document.getElementById('order-total');

      if (linesContainer) {
        if (!cartItems.length) {
          /* No order data found — user may have arrived directly */
          linesContainer.innerHTML = `
            <div class="order-line" style="justify-content:center;color:#9ca3af;font-size:.875rem;padding:1.5rem;">
              No order details available.
            </div>`;
        } else {
          let computedTotal = 0;
          linesContainer.innerHTML = cartItems.map(item => {
            const qty      = item.quantity || 1;
            const lineTotal = item.price * qty;
            computedTotal  += lineTotal;
            return `
              <div class="order-line">
                <img class="order-line-img" src="${item.image || '../images/image 18.png'}" alt="${item.title}" loading="lazy">
                <div class="order-line-info">
                  ${item.title}<br>
                  <span style="font-size:.8125rem;color:#9ca3af;">&times;${qty}</span>
                </div>
                <div class="order-line-price">$${lineTotal.toFixed(2)}</div>
              </div>`;
          }).join('');
          if (totalEl) totalEl.textContent = '$' + (total || computedTotal).toFixed(2);
        }
      }

      /* Clear sessionStorage after reading — prevents stale data on refresh */
      try { sessionStorage.removeItem('order-data'); } catch(e) {}
    });
