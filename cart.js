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