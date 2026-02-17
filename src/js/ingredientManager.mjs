let selectedIngredients = [];

export function updateSelectedIngredients(ingredient, add = true) {
  if (add && !selectedIngredients.includes(ingredient)) {
    selectedIngredients.push(ingredient);
  } else if (!add) {
    selectedIngredients = selectedIngredients.filter((i) => i !== ingredient);
  }
  renderSelectedIngredients();
}

export function getSelectedIngredients() {
  return selectedIngredients;
}

function renderSelectedIngredients() {
  const container = document.getElementById("selected-ingredients");
  if (!container) return;

  container.innerHTML =
    selectedIngredients
      .map(
        (ing) => `
    <span class="ingredient-chip" data-ing="${ing}">
      ${ing}
      <span class="remove" data-ingredient="${ing}">×</span>
    </span>
  `
      )
      .join("") +
    `<button class="add-ingredient-btn" id="add-more-ingredients">+</button>`;

  // Add remove listeners
  document.querySelectorAll(".ingredient-chip .remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const chip = e.target.closest(".ingredient-chip");
      chip.classList.add("removing");
      setTimeout(() => {
        const ing = chip.dataset.ing;
        updateSelectedIngredients(ing, false);
      }, 300);
    });
  });

  // Add more button
  const addBtn = document.getElementById("add-more-ingredients");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      document.getElementById("ingredient-input")?.focus();
    });
  }
}
