import { initHome } from "./home.mjs";
import { initSearch } from "./recipeSearch.mjs";
import { initDetail } from "./recipeDetail.mjs";
import { initFavorites } from "./favorites.mjs";
import { initTips } from "./tips.mjs";
import { loadDarkMode } from "./uiAnimations.mjs";
import { setupNavigation, updateLinksForBaseUrl } from "./navigationHelper.mjs";

function router() {
  const baseUrl = import.meta.env.BASE_URL || "/";
  let path = window.location.pathname;
  
  // Remove base URL from path if present (for GitHub Pages subdirectory)
  if (path.startsWith(baseUrl) && baseUrl !== "/") {
    path = path.slice(baseUrl.length - 1); // Keep leading slash
  }
  
  // Clear previous page content
  const main = document.querySelector("main");
  if (main) {
    // Allow graceful transitions
    main.style.opacity = "1";
  }
  
  if (path === "/" || path === "/index.html") {
    initHome();
  } else if (path === "/recipe/" || path === "/recipe/index.html") {
    initSearch();
  } else if (path.includes("/recipe/detail.html")) {
    initDetail();
  } else if (path.includes("/favorites/")) {
    initFavorites();
  } else if (path.includes("/tips/")) {
    initTips();
  }
}

// Handle navigation changes (from back/forward buttons and manual navigation)
window.addEventListener("popstate", () => {
  router();
});

document.addEventListener("DOMContentLoaded", () => {
  // Setup navigation helpers for GitHub Pages subdirectory
  updateLinksForBaseUrl();
  setupNavigation();
  
  router();
  loadDarkMode();

  // Set up mobile menu toggle
  setupMobileMenu();
});

function setupMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const bottomNav = document.querySelector(".bottom-nav");
  
  if (menuToggle && bottomNav) {
    menuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      bottomNav.classList.toggle("mobile-menu-open");
      menuToggle.setAttribute("aria-expanded", bottomNav.classList.contains("mobile-menu-open"));
    });
    
    // Close menu when a nav item is clicked
    const navItems = bottomNav.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        bottomNav.classList.remove("mobile-menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
}
