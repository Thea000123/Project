/*
 * shared.js
 * Injects header, footer, search modal.
 * Relies on ../style.css for all shared styles.
 * DO NOT re-bind search-btn here — Search.init() in utils.js handles it.
 */

const PRODUCTS = [
  { id: 3, title: "TURTLE MINI COLOURED", price: 215.0,  image: "../images/image 17.png" },
  { id: 3, title: "TURTLE MARBLE",        price: 585.0,  image: "../images/image 18.png" },
  { id: 3, title: "TURTLE 14 CARAT",      price: 3850.0, image: "../images/image 19.png" },
  { id: 3, title: "TURTLE RELIEF",        price: 215.0,  image: "../images/image 20.png" },
  { id: 3, title: "TURTLE ALLOY",         price: 585.0,  image: "../images/image 27.png" },
  { id: 3, title: "TURTLE MINI AQUA",     price: 215.0,  image: "../images/image 28.png" },
  { id: 3, title: "TURTLE COLOURED",      price: 415.0,  image: "../images/image 29.png" },
  { id: 3, title: "TURTLE GOLD BRONZE",   price: 445.0,  image: "../images/image 30.png" },
  { id: 3, title: "TURTLE JADE CAST",     price: 415.0,  image: "../images/image 31.png" },
  { id: 3, title: "FISH CORAL TROUT",     price: 825.0,  image: "../images/image 17.png", detailUrl: "product-detail-2.html" },
  { id: 3, title: "WHALE HUMPBACK MINI",  price: 320.0,  image: "../images/image 18.png" },
  { id: 3, title: "MANTA RAY MINI",       price: 210.0,  image: "../images/image 19.png" }
];

const SHARED_HEADER = `
<header class="navbar">
  <div class="header-left">
    <a href="index.html" class="navbar-logo" aria-label="FOOT Home">
      <img src="../images/IMG_0625.png" alt="FOOT Logo" width="28" height="32">
      <span class="navbar-brand">FOOT</span>
    </a>
  </div>
  <div class="header-center">
    <nav class="navbar-menu" aria-label="Main Navigation">
      <a href="index.html"        class="navbar-link">Home</a>
      <a href="faq.html"         class="navbar-link">FAQ</a>
      <a href="pricing.html"     class="navbar-link">Pricing</a>
      <a href="recommended.html" class="navbar-link">Recommended</a>
      <a href="links.html"       class="navbar-link">Links</a>
      <a href="license.html"     class="navbar-link">License</a>
      <a href="contact.html"     class="navbar-link">Contact</a>
    </nav>
  </div>
  <div class="header-right">
    <button id="search-btn" class="navbar-btn" aria-label="Search" type="button">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    </button>
    <a href="cart.html" class="navbar-btn" aria-label="Shopping Cart" style="position:relative;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
      <span class="cart-badge" style="display:none;"></span>
    </a>
    <a href="login.html" class="navbar-btn navbar-login-desktop" aria-label="Login">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
      <span style="margin-left:.375rem;font-size:.875rem;">Login</span>
    </a>
    <button class="navbar-mobile-toggle" id="mobile-menu-btn" aria-label="Toggle menu" aria-expanded="false" type="button">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="6"  x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>
  </div>
</header>
<div class="navbar-mobile-menu" id="mobile-menu">
  <a href="index.html"         class="navbar-link">Home</a>
  <a href="faq.html"          class="navbar-link">FAQ</a>
  <a href="pricing.html"      class="navbar-link">Pricing</a>
  <a href="recommended.html"  class="navbar-link">Recommended</a>
  <a href="links.html"        class="navbar-link">Links</a>
  <a href="license.html"      class="navbar-link">License</a>
  <a href="contact.html"      class="navbar-link">Contact</a>
  <a href="login.html"        class="navbar-link">Login</a>
</div>`;

const SHARED_FOOTER = `
<footer class="ft">
  <div class="ft-inner">
    <div class="ft-left">
      <a href="index.html" class="ft-logo">
        <img src="../images/IMG_0625.png" alt="FOOT Logo" width="22" height="26" aria-hidden="true">
        <span class="ft-logo-text">FOOT</span>
      </a>
      <p class="ft-desc">Comprising a wide range of Australian made sculpture and jewellery which is not only remarkably beautiful and unique, but durable, priced for any budget and designed to accommodate all tastes in art.</p>
      <div class="ft-social">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.265.069 1.645.069 4.849s-.011 3.584-.069 4.849c-.063 1.366-.335 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.646.069-4.85.069s-3.584-.011-4.849-.069c-1.366-.063-2.633-.335-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.849c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 1.999 2.029.643 3.385.127 5.227.042 7.082.014 8.362 0 8.771 0 12c0 3.229.014 3.638.072 4.918.085 1.855.601 3.697 1.957 5.053 1.356 1.356 3.198 1.872 5.053 1.957C8.362 23.986 8.771 24 12 24c3.229 0 3.638-.014 4.918-.072 1.855-.085 3.697-.601 5.053-1.957 1.356-1.356 1.872-3.198 1.957-5.053C23.986 15.638 24 15.229 24 12c0-3.229-.014-3.638-.072-4.918-.085-1.855-.601-3.697-1.957-5.053C20.615.673 18.773.157 16.918.072 15.638.014 15.229 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
        </a>
        <span class="ft-copy-mid">2017 &copy; Foot's Artworks</span>
      </div>
    </div>
    <div class="ft-divider"></div>
    <div class="ft-nav">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="pricing.html">Pricing</a></li>
        <li><a href="faq.html">FAQ</a></li>
        <li><a href="recommended.html">Recommended</a></li>
      </ul>
      <ul>
        <li><a href="license.html">License</a></li>
        <li><a href="links.html">Links</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
  </div>
</footer>`;

/* Search modal HTML — uses .active class matching style.css */
const SHARED_SEARCH_MODAL = `
<div id="search-modal" class="search-modal" role="dialog" aria-label="Search products" aria-modal="true">
  <div class="search-box">
    <div class="search-input-wrapper">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input type="text" class="search-input" placeholder="Search artworks…" aria-label="Search products" autocomplete="off">
      <a href="search.html" class="search-action-btn" onclick="Search.close()" aria-label="Go to full search page">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </a>
      <button class="search-close" type="button" onclick="Search.close()">Cancel</button>
    </div>
    <div id="search-results" class="search-results">
      <div class="search-prompt"><p>Type to search products</p></div>
    </div>
  </div>
</div>`;

document.addEventListener('DOMContentLoaded', () => {

  /* 1. Inject style.css once */
  if (!document.querySelector('link[data-shared-css]')) {
    const isInHtml = window.location.pathname.toLowerCase().includes('/html/');
    const cssPath  = isInHtml ? '../style.css' : 'style.css';
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = cssPath;
    link.setAttribute('data-shared-css', '1');
    document.head.insertBefore(link, document.head.firstChild);
  }

  /* 2. Inject header */
  const headerEl = document.getElementById('shared-header');
  if (headerEl) headerEl.outerHTML = SHARED_HEADER;

  /* 3. Inject footer */
  const footerEl = document.getElementById('shared-footer');
  if (footerEl) footerEl.outerHTML = SHARED_FOOTER;

  /* 4. Inject search modal at end of body */
  if (!document.getElementById('search-modal')) {
    document.body.insertAdjacentHTML('beforeend', SHARED_SEARCH_MODAL);
  }

  /* 5. Mobile hamburger */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu    = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', e => {
      e.stopPropagation();
      const open = mobileMenu.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', open);
      mobileMenu.setAttribute('aria-hidden', !open);
    });
    mobileMenu.querySelectorAll('.navbar-link').forEach(l => l.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('click', e => {
      if (mobileMenu.classList.contains('active')
          && !mobileMenu.contains(e.target)
          && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* 6. Init Search (Search.init binds #search-btn itself via bindEvents) */
  if (typeof Search !== 'undefined') {
    Search.init(PRODUCTS);
  }

  /* 7. Init Toast container */
  if (typeof Toast !== 'undefined' && Toast.init) Toast.init();

  /* 8. Update cart badge */
  if (typeof CartUtils !== 'undefined') CartUtils.updateCartBadge();
});

window.PRODUCTS = PRODUCTS;
