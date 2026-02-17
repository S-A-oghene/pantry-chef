import { searchRecipesByIngredients } from "./apiService.mjs";
import { renderRecipeCards, showSkeleton } from "./uiComponents.mjs";
import {
  updateSelectedIngredients,
  getSelectedIngredients,
} from "./ingredientManager.mjs";
import { ingredientMapping } from "./ingredientMap.mjs";
import { openPantryModal } from "./pantryManager.mjs";

export async function initHome() {
  // Load popular recipes on mobile
  const popularContainer = document.getElementById("popular-recipes");
  if (popularContainer) {
    showSkeleton(popularContainer, 3);
    try {
      const recipes = await searchRecipesByIngredients([
        "rice",
        "chicken",
        "pepper",
      ]);
      renderRecipeCards(recipes, popularContainer, "mobile");
    } catch {
      popularContainer.innerHTML =
        "<p>Unable to load popular recipes. Check your connection.</p>";
    }
  }

  // Load popular recipes on desktop
  const desktopGrid = document.getElementById("desktop-popular");
  if (desktopGrid) {
    try {
      const recipes = await searchRecipesByIngredients([
        "rice",
        "chicken",
        "pepper",
      ]);
      renderRecipeCards(recipes, desktopGrid, "desktop");
    } catch {
      desktopGrid.innerHTML = "<p>Unable to load.</p>";
    }
  }

  // Ingredient input autosuggest
  const input = document.getElementById("ingredient-input");
  const suggestions = document.getElementById("suggestions");
  if (input && suggestions) {
    input.addEventListener("input", (e) => {
      const val = e.target.value.toLowerCase();
      if (val.length < 2) {
        suggestions.classList.remove("active");
        return;
      }
      const matches = Object.keys(ingredientMapping)
        .filter((name) => name.toLowerCase().includes(val))
        .slice(0, 5);
      if (matches.length) {
        suggestions.innerHTML = matches
          .map((m) => `<div class="suggestion-item">${m}</div>`)
          .join("");
        suggestions.classList.add("active");
      } else {
        suggestions.classList.remove("active");
      }
    });

    suggestions.addEventListener("click", (e) => {
      if (e.target.classList.contains("suggestion-item")) {
        const ingredient = e.target.textContent;
        addIngredient(ingredient);
        input.value = "";
        suggestions.classList.remove("active");
      }
    });
  }

  function addIngredient(ing) {
    const normalized = ingredientMapping[ing] || ing;
    updateSelectedIngredients(normalized, true);
  }

  // Nigerian Specials button
  document
    .getElementById("nigerian-specials")
    ?.addEventListener("click", () => {
      window.location.href = "/recipe/?category=Nigerian";
    });

  // Manage pantry button (desktop)
  document
    .querySelector(".manage-btn")
    ?.addEventListener("click", openPantryModal);

  // Menu toggle button (mobile)
  document
    .querySelector(".menu-toggle")
    ?.addEventListener("click", () => {
      // Toggle mobile menu (if implemented)
    });

  // Add ingredient button (mobile)
  document
    .querySelector(".add-ingredient-btn")
    ?.addEventListener("click", () => {
      // Focus on the input field to show suggestions
      const input = document.getElementById("ingredient-input");
      if (input) input.focus();
    });

  // Desktop icon buttons (profile, notifications)
  document.querySelectorAll(".icon-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Placeholder for future functionality
    });
  });

  // Form submit
  const form = document.getElementById("ingredient-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const ingredients = getSelectedIngredients();
    if (ingredients.length === 0) {
      alert("Please add at least one ingredient.");
      return;
    }
    window.location.href = `/recipe/?ingredients=${encodeURIComponent(ingredients.join(","))}`;
  });

  // View all recipes button
  document.querySelector(".view-all-btn")?.addEventListener("click", () => {
    window.location.href = "/recipe/";
  });
}
