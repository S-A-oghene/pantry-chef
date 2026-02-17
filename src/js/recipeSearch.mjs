import { searchRecipesByIngredients } from "./apiService.mjs";
import { renderRecipeCards, showSkeleton } from "./uiComponents.mjs";
import { getUrl } from "./navigationHelper.mjs";

export async function initSearch() {
  const urlParams = new URLSearchParams(window.location.search);
  const ingredientsParam = urlParams.get("ingredients");
  const category = urlParams.get("category");

  // If ingredients provided, display as chips
  const chipContainer = document.getElementById("chip-container");
  if (ingredientsParam && chipContainer) {
    const ingredients = ingredientsParam.split(",");
    ingredients.forEach((ing) => {
      const chip = document.createElement("span");
      chip.className = "ingredient-chip";
      chip.innerHTML = `${ing} <span class="remove">×</span>`;
      chipContainer.appendChild(chip);
    });
    // Add remove listeners (simplified)
    document.querySelectorAll(".ingredient-chip .remove").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const chip = e.target.closest(".ingredient-chip");
        chip.classList.add("removing");
        setTimeout(() => chip.remove(), 300);
      });
    });
  }

  // Fetch recipes
  const resultsContainer = document.getElementById("search-results");
  if (resultsContainer) {
    showSkeleton(resultsContainer, 4);
    try {
      let recipes = [];
      if (ingredientsParam) {
        const ingArray = ingredientsParam.split(",");
        recipes = await searchRecipesByIngredients(ingArray);
      } else if (category === "Nigerian") {
        recipes = await searchRecipesByIngredients([
          "rice",
          "pepper",
          "tomato",
        ]);
      } else {
        recipes = []; // default empty
      }
      renderRecipeCards(recipes, resultsContainer, "mobile", {
        showMatch: true,
      });
      document.querySelector(".results-count").textContent =
        `${recipes.length} RECIPES FOUND:`;
    } catch {
      resultsContainer.innerHTML = "<p>Error loading recipes.</p>";
    }
  }

  // Filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      // Here you would apply filter logic (e.g., re-fetch with new criteria)
      // For demo, just reload with category filter
      const filter = btn.textContent.trim();
      if (filter === "Nigerian") {
        window.location.href = getUrl("/recipe/?category=Nigerian");
      } else if (filter === "All") {
        window.location.href = getUrl("/recipe/");
      }
    });
  });

  // Load more (simulate)
  document.getElementById("load-more")?.addEventListener("click", () => {
    alert("Load more not implemented in demo.");
  });

  // Back button
  document
    .querySelector(".back-btn")
    ?.addEventListener("click", () => {
      window.history.back();
    });

  // Settings button
  document
    .querySelector(".settings-btn")
    ?.addEventListener("click", () => {
      alert("Settings not implemented yet.");
    });
}
