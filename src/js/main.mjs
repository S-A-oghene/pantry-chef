import { initHome } from "./home.mjs";
import { initSearch } from "./recipeSearch.mjs";
import { initDetail } from "./recipeDetail.mjs";
import { initFavorites } from "./favorites.mjs";
import { initTips } from "./tips.mjs";
import { loadDarkMode } from "./uiAnimations.mjs";

function router() {
  const path = window.location.pathname;
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
  router();
  loadDarkMode();
});
