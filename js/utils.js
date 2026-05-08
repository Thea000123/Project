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

  renderResults(results, query) {
    const container = document.getElementById('search-results');
    if (!container) return;

    if (results.length === 0 && query.trim()) {
      container.innerHTML = `
        <div class="search-empty">
          <p>No results found for "${query}"</p>
        </div>
      `;
      return;
    }
    if (!query.trim()) {
      container.innerHTML = `
        <div class="search-prompt">
          <p>Type to search products</p>
        </div>
      `;
      return;
    }
    container.innerHTML = results.map(product => `
      <a href="product-${product.id}.html" class="search-result-item" onclick="Search.close()">
        <img src="${product.image}" alt="${product.title}" class="search-result-image" loading="lazy">
        <div class="search-result-info">
          <p class="search-result-title">${product.title}</p>
          <p class="search-result-price">$${product.price.toFixed(2)}</p>
        </div>
      </a>
    `).join('');
  }
};

const Accordion = {
  init() {
    const accordions = document.querySelectorAll('.accordion-item');
    
    accordions.forEach(accordion => {
      const header = accordion.querySelector('.accordion-header');
      if (header) {
        header.addEventListener('click', () => {
          this.toggle(accordion);
        });
      }
    });
  },

  toggle(accordion) {
    const isActive = accordion.classList.contains('active');
    
    document.querySelectorAll('.accordion-item').forEach(item => {
      item.classList.remove('active');
    });

    if (!isActive) {
      accordion.classList.add('active');
    }
  }
};

const MobileMenu = {
  init() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        const isOpen = menu.classList.contains('active');
        toggle.setAttribute('aria-expanded', isOpen);
        
        toggle.innerHTML = isOpen 
          ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
          : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
      });

      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
          menu.classList.remove('active');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
        }
      });
    }
  }
};

const QuantitySelector = {
  init() {
    const selectors = document.querySelectorAll('.quantity-selector');
    
    selectors.forEach(selector => {
      const minusBtn = selector.querySelector('[data-action="minus"]');
      const plusBtn = selector.querySelector('[data-action="plus"]');
      const input = selector.querySelector('input[type="number"]');
      
      if (minusBtn && input) {
        minusBtn.addEventListener('click', () => {
          const current = parseInt(input.value) || 1;
          if (current > 1) {
            input.value = current - 1;
            input.dispatchEvent(new Event('change'));
          }
        });
      }

      if (plusBtn && input) {
        plusBtn.addEventListener('click', () => {
          const current = parseInt(input.value) || 1;
          input.value = current + 1;
          input.dispatchEvent(new Event('change'));
        });
      }
    });
  }
};

const ImageGallery = {
  init() {
    const gallery = document.querySelector('.product-gallery');
    if (!gallery) return;

    const mainImage = gallery.querySelector('.product-gallery-main img');
    const thumbs = gallery.querySelectorAll('.product-gallery-thumb');

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        if (mainImage) {
          mainImage.src = thumb.dataset.full || thumb.src;
          mainImage.alt = thumb.alt || 'Product image';
        }
        
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });

    if (mainImage) {
      mainImage.addEventListener('click', () => {
        this.openLightbox(mainImage.src);
      });
    }
  },

  openLightbox(src) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <img src="${src}" alt="Enlarged product image">
        <button class="lightbox-close">&times;</button>
      </div>
    `;

    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      cursor: pointer;
    `;

    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
      position: relative;
      max-width: 90%;
      max-height: 90%;
    `;

    const img = lightbox.querySelector('img');
    img.style.cssText = `
      max-width: 100%;
      max-height: 90vh;
      object-fit: contain;
      border-radius: 8px;
    `;

    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
      position: absolute;
      top: -40px;
      right: 0;
      background: none;
      border: none;
      color: white;
      font-size: 2rem;
      cursor: pointer;
      padding: 0.5rem;
    `;

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      lightbox.remove();
    });
    
    lightbox.addEventListener('click', () => {
      lightbox.remove();
    });
    
    document.body.appendChild(lightbox);
  }
};

const LazyLoad = {
  init() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      images.forEach(img => observer.observe(img));
    }
  }
};

const PageTransition = {
  init() {
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
      document.body.style.transition = 'opacity 0.3s ease';
      document.body.style.opacity = '1';
    });
  }
};