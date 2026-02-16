import { searchRecipesByIngredients } from "./apiService.mjs";
import { renderRecipeCards, showSkeleton } from "./uiComponents.mjs";
import {
  updateSelectedIngredients,
  getSelectedIngredients,
} from "./ingredientManager.mjs";
import { ingredientMapping } from "./ingredientMap.mjs";
import { openPantryModal } from "./pantryManager.mjs";
import { getUrl } from "./navigationHelper.mjs";

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
    // Add aria-autocomplete attributes
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-controls", "suggestions");
    input.setAttribute("aria-expanded", "false");
    
    input.addEventListener("input", (e) => {
      const val = e.target.value.toLowerCase().trim();
      if (val.length < 1) {
        suggestions.classList.remove("active");
        input.setAttribute("aria-expanded", "false");
        return;
      }
      const matches = Object.keys(ingredientMapping)
        .filter((name) => name.toLowerCase().includes(val))
        .slice(0, 5);
      if (matches.length) {
        suggestions.innerHTML = matches
          .map((m) => `<div class="suggestion-item" role="option">${m}</div>`)
          .join("");
        suggestions.classList.add("active");
        input.setAttribute("aria-expanded", "true");
      } else {
        suggestions.classList.remove("active");
        input.setAttribute("aria-expanded", "false");
      }
    });

    suggestions.addEventListener("click", (e) => {
      if (e.target.classList.contains("suggestion-item")) {
        const ingredient = e.target.textContent.trim();
        addIngredient(ingredient);
        input.value = "";
        suggestions.classList.remove("active");
        input.setAttribute("aria-expanded", "false");
        input.focus();
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
      // Show error message to user
      const input = document.getElementById("ingredient-input");
      input?.setAttribute("aria-invalid", "true");
      input?.setAttribute("aria-describedby", "ingredient-error");
      
      // Create error message if it doesn't exist
      let errorMsg = document.getElementById("ingredient-error");
      if (!errorMsg) {
        errorMsg = document.createElement("div");
        errorMsg.id = "ingredient-error";
        errorMsg.className = "error-message";
        errorMsg.role = "alert";
        input?.parentElement?.appendChild(errorMsg);
      }
      errorMsg.textContent = "Please add at least one ingredient to search.";
      errorMsg.style.display = "block";
      input?.focus();
      return;
    }
    window.location.href = getUrl(`/recipe/?ingredients=${encodeURIComponent(ingredients.join(","))}`);
  });

  // View all recipes button
  document.querySelector(".view-all-btn")?.addEventListener("click", () => {
    window.location.href = "/recipe/";
  });
}
