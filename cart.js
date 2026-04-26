/*
 * =======================================
 * cart.js - Cart State Management
 * Features: Cart CRUD, localStorage persistence
 * =======================================
 */

/*
 * CartStore
 * Manage cart state with localStorage persistence
 */
class CartStore {
  constructor() {
    this.items = this.loadFromStorage();
    this.listeners = [];
  }

  /*
   * Load from Storage 
   * Read cart data from localStorage
   */
  loadFromStorage() {
    try {
      const stored = localStorage.getItem('cart-storage');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  /*
   * Save to Storage 
   * localStorage
   * Save cart data to localStorage
   */
  saveToStorage() {
    try {
      localStorage.setItem('cart-storage', JSON.stringify(this.items));
      this.notifyListeners();
    } catch (e) {
      console.warn('Unable to save cart to local storage');
    }
  }

  /*
   * Subscribe 
   * Register state change listener
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
  /*
   * Notify Listeners
   * Notify all listeners on state change
   */
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.items));
  }
 /*
   * Add Item
   * Add item to cart, quantity +1
   */
  addItem(item) {
    const existingItem = this.items.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        ...item,
        quantity: 1
      });
    }
    
    this.saveToStorage();
    return true;
  }
  /*
   * Remove Item
   * Remove item from cart
   */
  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveToStorage();
  }
  /*
   * Update Quantity
   * Update quantity, remove if <=0
   */
  updateQuantity(id, quantity) {
    if (quantity <= 0) {
      this.removeItem(id);
      return;
    }

    const item = this.items.find(i => i.id === id);
    if (item) {
      item.quantity = quantity;
      this.saveToStorage();
    }
  }
  clearCart() {
    this.items = [];
    this.saveToStorage();
  }

  getItems() {
    return [...this.items];
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
const cart = new CartStore();

const CartUtils = {
  formatPrice(price) {
    return `$${price.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  },

  updateCartBadge() {
    const totalItems = cart.getTotalItems();
    const badges = document.querySelectorAll('.cart-badge');
    
    badges.forEach(badge => {
      if (totalItems > 0) {
        badge.textContent = totalItems > 99 ? '99+' : totalItems;
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    });
  },

  renderCartItems(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const items = cart.getItems();
    
    if (items.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
          <h3 class="empty-state-title">购物车是空的</h3>
          <p class="empty-state-description">还没有添加任何商品到购物车，快去挑选心仪的商品吧</p>
          <a href="index.html" class="btn btn-primary">去购物</a>
        </div>
      `;
      return;
    }

    container.innerHTML = items.map((item, index) => `
      <div class="cart-item" data-id="${item.id}" style="animation-delay: ${index * 0.05}s">
        <a href="product-${item.id}.html" class="cart-item-image">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
        </a>
        <div class="cart-item-info">
          <a href="product-${item.id}.html" class="cart-item-title">${item.title}</a>
          ${item.subtitle ? `<p class="cart-item-subtitle">${item.subtitle}</p>` : ''}
          <p class="cart-item-price">${CartUtils.formatPrice(item.price)}</p>
        </div>
        <div class="cart-item-actions">
          <div class="quantity-selector">
            <button class="quantity-btn" onclick="CartUtils.decreaseQuantity(${item.id})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn" onclick="CartUtils.increaseQuantity(${item.id})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
          <button class="cart-item-remove" onclick="CartUtils.removeItem(${item.id})" aria-label="删除商品">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    `).join('');
  },


}