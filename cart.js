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
}