import { searchRecipesByIngredients } from "./apiService.mjs";
import { renderRecipeCards, showSkeleton } from "./uiComponents.mjs";
import { getUrl } from "./navigationHelper.mjs";

let routerFunc = null;

export function setRouter(router) {
  routerFunc = router;
}

function navigateTo(path) {
  const url = getUrl(path);
  window.history.pushState({}, "", url);
  if (routerFunc) routerFunc();
}

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

  // Fetch recipes with pagination
  const resultsContainer = document.getElementById("search-results");

  // Filter buttons with full filter logic
  let selectedFilters = { category: null, mealType: null, time: null };
  
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const filterValue = btn.textContent.trim();
      
      // Determine filter type
      if (filterValue === "All") {
        // Reset all filters
        selectedFilters = { category: null, mealType: null, time: null };
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        navigateTo("/recipe/");
      } else if (["Breakfast", "Lunch", "Dinner"].includes(filterValue)) {
        // Meal type filter
        selectedFilters.mealType = filterValue.toLowerCase();
        updateActiveButtons(btn);
        reloadWithFilters();
      } else if (["<30min", "<60min"].includes(filterValue)) {
        // Time filter
        selectedFilters.time = filterValue;
        updateActiveButtons(btn);
        reloadWithFilters();
      } else if (filterValue === "Nigerian") {
        // Country filter
        selectedFilters.category = "Nigerian";
        updateActiveButtons(btn);
        reloadWithFilters();
      }
    });
    btn.setAttribute("role", "button");
    btn.setAttribute("aria-pressed", "false");
  });
  
  function updateActiveButtons(activeBtn) {
    document.querySelectorAll(".filter-btn").forEach((b) => {
      const isActive = b === activeBtn;
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-pressed", isActive);
    });
  }
  
  function reloadWithFilters() {
    const params = new URLSearchParams();
    if (ingredientsParam) params.set("ingredients", ingredientsParam);
    if (selectedFilters.category) params.set("category", selectedFilters.category);
    if (selectedFilters.mealType) params.set("mealType", selectedFilters.mealType);
    if (selectedFilters.time) params.set("time", selectedFilters.time);
    navigateTo(`/recipe/?${params.toString()}`);
  }

  // Load more button with pagination support
  const loadMoreBtn = document.getElementById("load-more");
  let allRecipes = [];
  let displayedCount = 0;
  const itemsPerPage = 8;
  
  if (loadMoreBtn) {
    loadMoreBtn.setAttribute("aria-label", "Load more recipes");
    loadMoreBtn.style.display = "none"; // Hide until we have results
    
    loadMoreBtn.addEventListener("click", () => {
      if (allRecipes.length > displayedCount) {
        // Load next batch of recipes
        const nextBatch = allRecipes.slice(displayedCount, displayedCount + itemsPerPage);
        renderRecipeCards(nextBatch, resultsContainer, "mobile", { showMatch: true });
        displayedCount += itemsPerPage;
        
        // Hide button if no more recipes to load
        if (displayedCount >= allRecipes.length) {
          loadMoreBtn.style.display = "none";
        }
      }
    });
  }
  
  // Update fetch recipes section to support pagination
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
      
      allRecipes = recipes;
      displayedCount = Math.min(itemsPerPage, recipes.length);
      
      // Display first batch
      const firstBatch = recipes.slice(0, displayedCount);
      renderRecipeCards(firstBatch, resultsContainer, "mobile", {
        showMatch: true,
      });
      
      // Update results count with pagination info
      const countElement = document.querySelector(".results-count");
      if (countElement) {
        countElement.textContent = `${recipes.length} RECIPES FOUND:`;
        if (recipes.length > displayedCount) {
          countElement.textContent += ` (showing ${displayedCount}/${recipes.length})`;
        }
      }
      
      // Show load more button if there are more recipes
      if (loadMoreBtn && recipes.length > displayedCount) {
        loadMoreBtn.style.display = "block";
      }
    } catch (err) {
      console.error("Error loading recipes:", err);
      resultsContainer.innerHTML = "<p>⚠️ Error loading recipes. Please check your connection and try again.</p>";
    }
  }

  // Back button with accessibility
  const backBtn = document.querySelector(".back-btn");
  if (backBtn) {
    backBtn.setAttribute("aria-label", "Go back to previous page");
    backBtn.addEventListener("click", () => {
      window.history.back();
    });
  }

  // Settings button with accessibility
  const settingsBtn = document.querySelector(".settings-btn");
  if (settingsBtn) {
    settingsBtn.setAttribute("aria-label", "Advanced filters and sort options");
    settingsBtn.addEventListener("click", () => {
      alert("⚙️ Advanced filter options (sort by rating, difficulty, prep time) coming soon!");
    });
  }
  
  // Add ingredient button accessibility
  const addIngBtn = document.querySelector(".add-ingredient-btn");
  if (addIngBtn) {
    addIngBtn.setAttribute("aria-label", "Add another ingredient to search");
    addIngBtn.addEventListener("click", () => {
      navigateTo("/");
    });
  }
}
