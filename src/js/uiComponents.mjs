export function renderRecipeCards(
  recipes,
  container,
  _view = "mobile",
  options = {}
) {
  container.innerHTML = "";
  if (!recipes || recipes.length === 0) {
    container.innerHTML = "<p>No recipes found.</p>";
    return;
  }
  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.dataset.id = recipe.id;
    card.addEventListener("click", () => {
      window.location.href = `/recipe/detail.html?id=${recipe.id}`;
    });
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
      <div class="recipe-info">
        <div class="recipe-title">${recipe.name}</div>
        <div class="recipe-meta">
          <span class="rating">${options.showMatch ? "✅ " + (recipe.matchCount || "4/5") : "⭐⭐⭐⭐"}</span>
          <span>${recipe.time || "45"} mins</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}
export function showSkeleton(container, count = 1) {
  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement("div");
    skeleton.className = "recipe-card skeleton";
    skeleton.innerHTML = `
      <div class="skeleton-image"></div>
      <div class="skeleton-info">
        <div class="skeleton-title"></div>
        <div class="skeleton-meta">
          <div class="skeleton-text"></div>
          <div class="skeleton-text"></div>
        </div>
      </div>
    `;
    container.appendChild(skeleton);
  }
}
