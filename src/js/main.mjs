import { initHome, setRouter as setHomeRouter } from "./home.mjs";
import { initSearch, setRouter as setSearchRouter } from "./recipeSearch.mjs";
import { initDetail, setRouter as setDetailRouter } from "./recipeDetail.mjs";
import { initFavorites, setRouter as setFavoritesRouter } from "./favorites.mjs";
import { initTips, setRouter as setTipsRouter } from "./tips.mjs";
import { loadDarkMode } from "./uiAnimations.mjs";
import { setupNavigation, updateLinksForBaseUrl } from "./navigationHelper.mjs";

export function router() {
  const baseUrl = import.meta.env.BASE_URL || "/";
  let path = window.location.pathname;
  
  // Remove base URL from path if present (for GitHub Pages subdirectory)
  if (path.startsWith(baseUrl) && baseUrl !== "/") {
    path = path.slice(baseUrl.length - 1); // Keep leading slash
  }
  
  // Normalize path
  if (!path.startsWith("/")) {
    path = "/" + path;
  }
  
  // Clear previous page content and call appropriate init function
  if (path === "/" || path === "/index.html" || path === "") {
    initHome();
  } else if (path === "/recipe/" || path === "/recipe/index.html") {
    initSearch();
  } else if (path.includes("/recipe/detail")) {
    initDetail();
  } else if (path.includes("/favorites")) {
    initFavorites();
  } else if (path.includes("/tips")) {
    initTips();
  }
}

// Handle navigation changes (from back/forward buttons)
window.addEventListener("popstate", () => {
  router();
});

document.addEventListener("DOMContentLoaded", () => {
  // Setup navigation helpers for GitHub Pages subdirectory
  updateLinksForBaseUrl();
  setupNavigation(router);
  
  // Pass router function to all modules so they can use it for navigation
  setHomeRouter(router);
  setSearchRouter(router);
  setDetailRouter(router);
  setFavoritesRouter(router);
  setTipsRouter(router);
  
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
