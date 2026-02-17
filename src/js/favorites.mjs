import { getFavorites } from "./localStorageManager.mjs";
import { renderRecipeCards } from "./uiComponents.mjs";

export function initFavorites() {
  const container = document.getElementById("favorites-list");
  const favorites = getFavorites();
  if (favorites.length === 0) {
    container.innerHTML = "<p>You have no saved recipes yet.</p>";
    return;
  }
  renderRecipeCards(favorites, container, "mobile");

  // Back button (if on detail view)
  document
    .querySelector(".back-btn")
    ?.addEventListener("click", () => {
      window.history.back();
    });
}
