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
    document.getElementById("hero-image").src = recipe.image;
    document.getElementById("hero-image").alt = recipe.name;
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

    // Ingredients list
    const ingredientsList = document.querySelector(".ingredients-list");
    ingredientsList.innerHTML = recipe.ingredients
      .map((ing) => {
        const local = convertMeasurements(ing.measure, ing.name);
        return `<li>
        <input type="checkbox">
        <span>${ing.measure} ${ing.name}</span>
        ${local ? `<span class="local-measure">(approx. ${local})</span>` : ""}
      </li>`;
      })
      .join("");

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

    // Back button
    document
      .querySelector(".back-btn")
      ?.addEventListener("click", () => {
        window.history.back();
      });

    // Favorite button
    const favBtn = document.querySelector(".favorite-btn");
    if (favBtn) {
      favBtn.textContent = isFavorite(id) ? "❤️" : "🤍";
      favBtn.addEventListener("click", () => {
        addToFavorites(recipe);
        favBtn.textContent = "❤️";
      });
    }

    // Share buttons
    document.querySelectorAll(".share-btn, #share-bottom").forEach((btn) => {
      btn.addEventListener("click", () => shareRecipe(recipe));
    });

    // Print button
    document
      .getElementById("print-btn")
      ?.addEventListener("click", () => printRecipe(recipe));

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
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      contents.forEach((c) => c.classList.remove("active"));
      document.getElementById(tab.dataset.tab + "-tab").classList.add("active");
    });
  });
}
