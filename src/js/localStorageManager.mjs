const FAVORITES_KEY = "pantrychef_favorites";

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

export function addToFavorites(recipe) {
  const favorites = getFavorites();
  if (!favorites.some((fav) => fav.id === recipe.id)) {
    favorites.push({ id: recipe.id, name: recipe.name, image: recipe.image });
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFromFavorites(recipeId) {
  const favorites = getFavorites().filter((fav) => fav.id !== recipeId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(recipeId) {
  return getFavorites().some((fav) => fav.id === recipeId);
}
