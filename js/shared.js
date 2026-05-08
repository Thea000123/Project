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