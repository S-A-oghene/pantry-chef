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

document.addEventListener("DOMContentLoaded", () => {
  // Setup navigation helpers for GitHub Pages subdirectory
  updateLinksForBaseUrl();
  setupNavigation();
  
  router();
  loadDarkMode();
});
