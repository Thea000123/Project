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
    };}
