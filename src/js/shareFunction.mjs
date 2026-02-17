import { getUrl } from "./navigationHelper.mjs";

export function shareRecipe(recipe) {
  const detailPath = getUrl(`/recipe/detail.html?id=${recipe.id}`);
  const detailUrl = `${window.location.origin}${detailPath}`;
  const text = `Check out this recipe: ${recipe.name} – ${detailUrl}`;

  if (navigator.share) {
    navigator
      .share({
        title: recipe.name,
        text: `Cook this with Pantry Chef!`,
        url: detailUrl,
      })
      .catch(() => fallbackShare(text));
  } else {
    fallbackShare(text);
  }
}

function fallbackShare(text) {
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, "_blank");
}
