/*
 * shared.js - Shared Components Injector
 * 
 */

const PRODUCTS = [
  { id: 1, title: "TURTLE MINI COLOURED", price: 215.0, image: "images/image 17.png" },
  { id: 2, title: "TURTLE MARBLE", price: 585.0, image: "images/image 18.png" },
  { id: 3, title: "TURTLE 14 CARAT", price: 3850.0, image: "images/image 19.png" },
  { id: 4, title: "TURTLE RELIEF", price: 215.0, image: "images/image 20.png" },
  { id: 5, title: "TURTLE ALLOY", price: 585.0, image: "images/image 27.png" },
  { id: 6, title: "TURTLE MINI AQUA", price: 215.0, image: "images/image 28.png" },
  { id: 7, title: "TURTLE COLOURED", price: 415.0, image: "images/image 29.png" },
  { id: 8, title: "TURTLE GOLD BRONZE", price: 445.0, image: "images/image 30.png" },
  { id: 9, title: "TURTLE JADE CAST", price: 415.0, image: "images/image 31.png" }
];

const SHARED_HEADER = `
<header class="navbar">
  <div class="header-left">
    <a href="main.html" class="navbar-logo" aria-label="FOOT Home">
      <svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <ellipse cx="10" cy="26" rx="6" ry="5" fill="#c084fc" />
        <ellipse cx="20" cy="20" rx="4.5" ry="6" fill="#4ade80" />
        <circle cx="6" cy="17" r="3" fill="#fb923c" />
        <circle cx="14" cy="13" r="2.5" fill="#60a5fa" />
        <circle cx="22" cy="12" r="2" fill="#f472b6" />
      </svg>
      <span class="navbar-brand">FOOT</span>
    </a>
  </div>
  <div class="header-center">
    <nav class="navbar-menu" aria-label="Main Navigation">
      <a href="main.html" class="navbar-link">Home</a>
      <a href="faq.html" class="navbar-link">FAQ</a>
      <a href="pricing.html" class="navbar-link">Pricing</a>
      <a href="recommended.html" class="navbar-link">Recommended</a>
      <a href="links.html" class="navbar-link">Links</a>
      <a href="license.html" class="navbar-link">License</a>
      <a href="contact.html" class="navbar-link">Contact</a>
    </nav>
  </div>
  <div class="header-right">
    <button id="search-btn" class="navbar-btn" aria-label="Search">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </button>
    <a href="cart.html" class="navbar-btn" aria-label="Cart" style="position:relative;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      <span class="cart-badge" style="display:none;"></span>
    </a>
    <a href="login.html" class="navbar-btn" aria-label="Login">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
      <span style="margin-left:0.375rem;font-size:0.875rem;">Login</span>
    </a>
  </div>
</header>
`;

const SHARED_FOOTER = `
<footer class="ft">
  <div class="ft-inner">
    <div class="ft-left">
      <a href="main.html" class="ft-logo">
        <svg width="22" height="26" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <ellipse cx="10" cy="26" rx="6" ry="5" fill="#c084fc" />
          <ellipse cx="20" cy="20" rx="4.5" ry="6" fill="#4ade80" />
          <circle cx="6" cy="17" r="3" fill="#fb923c" />
          <circle cx="14" cy="13" r="2.5" fill="#60a5fa" />
          <circle cx="22" cy="12" r="2" fill="#f472b6" />
        </svg>
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
        <li><a href="main.html">Home</a></li>
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
</footer>
`;

const SHARED_SEARCH_MODAL = `
<div id="search-modal" class="search-modal">
  <div class="search-box">
    <div class="search-input-wrapper">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>