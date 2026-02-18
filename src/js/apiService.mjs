import { API_KEYS } from "./config.mjs";

const MEALDB_BASE = "https://www.themealdb.com/api/json/v1/1";
const EDAMAM_BASE = "https://api.edamam.com/api/nutrition-details";

const cache = new Map();

// Initialize API status on module load
function initializeAPIFeedback() {
  console.log("🍳 Pantry Chef API Status:");
  console.log("✅ TheMealDB API: ENABLED (public API)");
  
  if (API_KEYS.EDAMAM?.APP_ID && API_KEYS.EDAMAM?.APP_KEY) {
    console.log("✅ Edamam API: ENABLED");
  } else {
    console.log("⚠️ Edamam API: DISABLED (configure APP_ID and APP_KEY in config.mjs for nutrition features)");
  }
}

// Call on module load
initializeAPIFeedback();

export async function searchRecipesByIngredients(ingredients) {
  const query = ingredients.join(",");
  const cacheKey = `search_${query}`;
  if (cache.has(cacheKey)) {
    console.log(`📦 Cache hit for ingredients: ${query}`);
    return cache.get(cacheKey);
  }

  try {
    console.log(`🔍 Searching recipes for: ${query}`);
    const response = await fetch(`${MEALDB_BASE}/filter.php?i=${query}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    const recipes = data.meals
      ? data.meals.map((meal) => ({
          id: meal.idMeal,
          name: meal.strMeal,
          image: meal.strMealThumb,
        }))
      : [];
    cache.set(cacheKey, recipes);
    console.log(`✅ Found ${recipes.length} recipes for: ${query}`);
    return recipes;
  } catch (err) {
    console.error("❌ Error fetching recipes:", err);
    throw err;
  }
}

export async function getRecipeById(id) {
  const cacheKey = `recipe_${id}`;
  if (cache.has(cacheKey)) {
    console.log(`📦 Cache hit for recipe ID: ${id}`);
    return cache.get(cacheKey);
  }

  try {
    console.log(`📖 Loading recipe details for ID: ${id}`);
    const response = await fetch(`${MEALDB_BASE}/lookup.php?i=${id}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    const meal = data.meals ? data.meals[0] : null;
    if (!meal) throw new Error("Recipe not found");

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const name = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (name && name.trim() !== "") {
        ingredients.push({ name: name.trim(), measure: measure.trim() });
      }
    }

    const recipe = {
      id: meal.idMeal,
      name: meal.strMeal,
      category: meal.strCategory,
      area: meal.strArea,
      instructions: meal.strInstructions,
      image: meal.strMealThumb,
      youtube: meal.strYoutube,
      tags: meal.strTags,
      ingredients,
    };
    cache.set(cacheKey, recipe);
    console.log(`✅ Recipe loaded: ${recipe.name}`);
    return recipe;
  } catch (err) {
    console.error("❌ Error fetching recipe details:", err);
    throw err;
  }
}

export async function getNutritionData(ingredientString) {
  if (
    !API_KEYS ||
    !API_KEYS.EDAMAM ||
    !API_KEYS.EDAMAM.APP_ID ||
    !API_KEYS.EDAMAM.APP_KEY
  ) {
    console.log("⚠️ Edamam API not configured. Using mock nutrition data. Configure API keys in config.mjs to enable real nutrition analysis.");
    return mockNutrition();
  }

  const cacheKey = `nutrition_${ingredientString}`;
  if (cache.has(cacheKey)) {
    console.log(`📦 Nutrition cache hit for: ${ingredientString}`);
    return cache.get(cacheKey);
  }

  try {
    console.log(`🥗 Fetching nutrition data for: ${ingredientString}`);
    const response = await fetch(
      `${EDAMAM_BASE}?app_id=${API_KEYS.EDAMAM.APP_ID}&app_key=${API_KEYS.EDAMAM.APP_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingr: [ingredientString] }),
      }
    );
    if (!response.ok) {
      if (response.status === 429) {
        console.warn("⚠️ Edamam API rate limit exceeded. Using mock data.");
        return mockNutrition();
      }
      throw new Error("Nutrition API error");
    }
    const data = await response.json();
    const nutrition = {
      calories: Math.round(data.calories),
      protein: Math.round(data.totalNutrients.PROCNT?.quantity || 0),
      carbs: Math.round(data.totalNutrients.CHOCDF?.quantity || 0),
      fat: Math.round(data.totalNutrients.FAT?.quantity || 0),
      fiber: Math.round(data.totalNutrients.FIBTG?.quantity || 0),
      sugar: Math.round(data.totalNutrients.SUGAR?.quantity || 0),
      iron: data.totalDaily?.FE
        ? Math.round(data.totalDaily.FE.quantity)
        : null,
      calcium: data.totalDaily?.CA
        ? Math.round(data.totalDaily.CA.quantity)
        : null,
      dietLabels: data.dietLabels || [],
    };
    cache.set(cacheKey, nutrition);
    console.log(`✅ Nutrition data received: ${nutrition.calories} calories`);
    return nutrition;
  } catch (err) {
    console.error("❌ Error fetching nutrition:", err);
    console.log("Using mock nutrition data as fallback.");
    return mockNutrition();
  }
}

function mockNutrition() {
  return {
    calories: 450,
    protein: 22,
    carbs: 65,
    fat: 15,
    fiber: 5,
    sugar: 8,
    iron: 15,
    calcium: 8,
    dietLabels: ["High-Protein"],
  };
}
