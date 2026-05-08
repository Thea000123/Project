/*
 * =======================================
 * utils.js -  / Utility Functions
 * Toast
 * Features: Toast notifications, theme toggle, search
 * =======================================
 */

/*
 * Toast Notifications /
 *
 * Features: Display temporary notifications
 */
const Toast = {
  container: null,
  /*
   * Initialize /
   * DOM
   * Create toast container DOM element
   */
  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },