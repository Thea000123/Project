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
  /*
   * Show Toast /
   * message:  / Message content
   * type: success|error|info
   * options: {duration, action} /
   */
  show(message, type = 'info', options = {}) {
    this.init();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    /* Icon SVGs */
    const icons = {
      success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',
      error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
      info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
    };

    toast.innerHTML = `
      ${icons[type]}
      <div class="toast-content">
        <p class="toast-message">${message}</p>
        ${options.action ? `<a href="${options.action.href}" class="btn btn-sm btn-primary" style="margin-top: 0.5rem;">${options.action.label}</a>` : ''}
      </div>
      <button class="toast-close" aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => {
      this.remove(toast);
    });

    this.container.appendChild(toast);

    /* Auto remove after duration */
    setTimeout(() => {
      this.remove(toast);
    }, options.duration || 4000);

    return toast;
  },

  /*
   * Remove Toast /
   * DOM
   * Animate out and remove from DOM
   */
  remove(toast) {
    toast.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }
};

/*
 * Search
 * Features: Product search modal
 */
const Search = {
  isOpen: false,
  products: [],

  init(products) {
    this.products = products;
    this.bindEvents();
    this.initSearchInput();
  },

  bindEvents() {
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => this.toggle());
    }
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
      if (e.key === '/' && !this.isOpen && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        this.open();
      }
    });
  },

  initSearchInput() {
    const searchModal = document.getElementById('search-modal');
    if (!searchModal) return;

    const searchInput = searchModal.querySelector('.search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput && searchResults) {
      let debounceTimer;
      
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          const results = this.search(e.target.value);
          this.renderResults(results, e.target.value);
        }, 200);
      });

      searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
          this.close();
        }
      });
    }
  },

  toggle() {
    this.isOpen ? this.close() : this.open();
  },
  open() {
    const modal = document.getElementById('search-modal');
    if (modal) {
      modal.classList.add('active');
      const input = modal.querySelector('.search-input');
      if (input) {
        setTimeout(() => input.focus(), 100);
      }
      document.body.style.overflow = 'hidden';
      this.isOpen = true;
    }
  },

  close() {
    const modal = document.getElementById('search-modal');
    if (modal) {
      modal.classList.remove('active');
      const input = modal.querySelector('.search-input');
      if (input) {
        input.value = '';
        const results = document.getElementById('search-results');
        if (results) {
          results.innerHTML = `
            <div class="search-prompt">
              <p>Type to search products</p>
            </div>
          `;
        }
      }
      document.body.style.overflow = '';
      this.isOpen = false;
    }
  },

  search(query) {
    if (!query.trim()) {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    return this.products.filter(product => 
      product.title.toLowerCase().includes(lowerQuery) ||
      product.description?.toLowerCase().includes(lowerQuery)
    );
  },