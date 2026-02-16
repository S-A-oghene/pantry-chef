import { getRecipeById, getNutritionData } from "./apiService.mjs";
import { convertMeasurements } from "./measurementConverter.mjs";
import { addToFavorites, isFavorite } from "./localStorageManager.mjs";
import { shareRecipe } from "./shareFunction.mjs";
import { printRecipe } from "./printRecipe.mjs";
import { animateProgressBars } from "./uiAnimations.mjs";

export async function initDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  if (!id) return;

  try {
    const recipe = await getRecipeById(id);
    if (!recipe) throw new Error("Recipe not found");

    // Fill hero image and title
    const heroImage = document.getElementById("hero-image");
    heroImage.src = recipe.image;
    heroImage.alt = recipe.name;
    heroImage.loading = "lazy";
    document.getElementById("recipe-title").textContent =
      recipe.name.toUpperCase();

    // Tags (simplified)
    const tagsContainer = document.querySelector(".tags");
    if (tagsContainer) {
      tagsContainer.innerHTML = `
        <span class="tag">${recipe.area || "International"}</span>
        <span class="tag">${recipe.category || "Main"}</span>
        ${
          recipe.tags
            ? recipe.tags
                .split(",")
                .map((t) => `<span class="tag">${t}</span>`)
                .join("")
            : ""
        }
      `;
    }

    // Stats
    document.querySelector(".stats-row").innerHTML = `
      <span>⏱ 45 mins</span>
      <span>👥 Serves 4</span>
      <span>🔥 Medium</span>
    `;

    // Ingredients list with accessibility
    const ingredientsList = document.querySelector(".ingredients-list");
    ingredientsList.innerHTML = recipe.ingredients
      .map((ing, idx) => {
        const local = convertMeasurements(ing.measure, ing.name);
        return `<li>
        <input type="checkbox" id="ingredient-${idx}" aria-label="Mark ${ing.name} as obtained">
        <label for="ingredient-${idx}"><span>${ing.measure} ${ing.name}</span></label>
        ${local ? `<span class="local-measure" title="Nigerian measurement conversion">(approx. ${local})</span>` : ""}
      </li>`;
      })
      .join("");
    
    // Set up check listeners
    document.querySelectorAll(".ingredients-list input[type='checkbox']").forEach((input) => {
      input.addEventListener("change", () => {
        input.parentElement.classList.toggle("checked", input.checked);
      });
    });

    // Method
    const methodSteps = document.querySelector(".method-steps");
    methodSteps.innerHTML = recipe.instructions
      .split("\n")
      .filter((s) => s.trim())
      .map(
        (step) => `
      <div class="method-step">${step}</div>
    `
      )
      .join("");

    // Nutrition
    const nutrition = await getNutritionData(
      recipe.ingredients.map((i) => `${i.measure} ${i.name}`).join(", ")
    );
    if (nutrition) {
      document.getElementById("calories").textContent = nutrition.calories;
      const dv = Math.round((nutrition.calories / 2000) * 100);
      document.getElementById("daily-value").textContent =
        `Daily Value: ${dv}%`;

      // Update macro circles (simplified – background set via JS later)
      document.querySelector("#carbs-circle span:first-child").textContent =
        `${nutrition.carbs}g`;
      document.querySelector("#protein-circle span:first-child").textContent =
        `${nutrition.protein}g`;
      document.querySelector("#fat-circle span:first-child").textContent =
        `${nutrition.fat}g`;

      // Set progress bars
      document.querySelector(".micro-bars .progress-fill").style.width =
        `${nutrition.iron || 45}%`;
      // etc. (simplified)
    }

    // Animate progress bars after setting
    animateProgressBars();

    // Back button with accessibility
    const backBtn = document.querySelector(".back-btn");
    if (backBtn) {
      backBtn.setAttribute("aria-label", "Go back to recipe list");
      backBtn.addEventListener("click", () => {
        window.history.back();
      });
    }

    // Favorite button with accessibility
    const favBtn = document.querySelector(".favorite-btn");
    if (favBtn) {
      const isFav = isFavorite(id);
      favBtn.textContent = isFav ? "❤️" : "🤍";
      favBtn.setAttribute("aria-label", isFav ? "Remove from favorites" : "Add to favorites");
      favBtn.setAttribute("aria-pressed", isFav);
      favBtn.addEventListener("click", () => {
        addToFavorites(recipe);
        favBtn.textContent = "❤️";
        favBtn.setAttribute("aria-label", "Remove from favorites");
        favBtn.setAttribute("aria-pressed", "true");
      });
    }

    // Share buttons with accessibility
    document.querySelectorAll(".share-btn, #share-bottom").forEach((btn) => {
      btn.setAttribute("aria-label", "Share this recipe");
      btn.addEventListener("click", () => shareRecipe(recipe));
    });

    // Print button with accessibility
    const printBtn = document.getElementById("print-btn");
    if (printBtn) {
      printBtn.setAttribute("aria-label", "Print this recipe");
      printBtn.addEventListener("click", () => printRecipe(recipe));
    }

    // Setup tabs
    setupTabs();
  } catch (err) {
    console.error(err);
    document.querySelector("main").innerHTML = "<p>Error loading recipe.</p>";
  }
}

function setupTabs() {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");
  
  // Set up tab roles and initial state
  tabs.forEach((tab, idx) => {
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", idx === 0 ? "true" : "false");
    tab.setAttribute("aria-controls", tab.dataset.tab + "-tab");
    tab.setAttribute("tabindex", idx === 0 ? "0" : "-1");
  });
  
  contents.forEach((content) => {
    content.setAttribute("role", "tabpanel");
    content.setAttribute("aria-labelledby", content.id.replace("-tab", ""));
  });
  
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
        t.setAttribute("tabindex", "-1");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      tab.setAttribute("tabindex", "0");
      
      contents.forEach((c) => c.classList.remove("active"));
      const panel = document.getElementById(tab.dataset.tab + "-tab");
      if (panel) panel.classList.add("active");
    });

    // Keyboard navigation (arrow keys)
    tab.addEventListener("keydown", (e) => {
      const allTabs = Array.from(tabs);
      const currentIndex = allTabs.indexOf(tab);
      let targetTab = null;

      if (e.key === "ArrowRight") {
        targetTab = allTabs[(currentIndex + 1) % allTabs.length];
      } else if (e.key === "ArrowLeft") {
        targetTab = allTabs[(currentIndex - 1 + allTabs.length) % allTabs.length];
      } else if (e.key === "Home") {
        targetTab = allTabs[0];
      } else if (e.key === "End") {
        targetTab = allTabs[allTabs.length - 1];
      }

      if (targetTab) {
        e.preventDefault();
        targetTab.click();
        targetTab.focus();
      }
    });
  });
}
