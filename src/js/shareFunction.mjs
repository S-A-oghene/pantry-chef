export function shareRecipe(recipe) {
  const text = `Check out this recipe: ${recipe.name} – ${window.location.origin}/recipe/detail.html?id=${recipe.id}`;

  if (navigator.share) {
    navigator
      .share({
        title: recipe.name,
        text: `Cook this with Pantry Chef!`,
        url: window.location.href,
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
