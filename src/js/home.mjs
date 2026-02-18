import { searchRecipesByIngredients } from "./apiService.mjs";
import { renderRecipeCards, showSkeleton } from "./uiComponents.mjs";
import {
  updateSelectedIngredients,
  getSelectedIngredients,
} from "./ingredientManager.mjs";
import { ingredientMapping } from "./ingredientMap.mjs";
import { openPantryModal } from "./pantryManager.mjs";
import { getUrl } from "./navigationHelper.mjs";
import { API_KEYS } from "./config.mjs";

// Import and use router from main.mjs
let routerFunc = null;

export function setRouter(router) {
  routerFunc = router;
}

function navigateTo(path) {
  const url = getUrl(path);
  window.history.pushState({}, "", url);
  if (routerFunc) routerFunc();
}

export async function initHome() {
  // Check API status and show feedback
  checkAndDisplayAPIStatus();
  
  // Load popular recipes on mobile
  const popularContainer = document.getElementById("popular-recipes");
  if (popularContainer) {
    showSkeleton(popularContainer, 3);
    try {
      const recipes = await searchRecipesByIngredients([
        "rice",
        "chicken",
        "pepper",
      ]);
      renderRecipeCards(recipes, popularContainer, "mobile");
    } catch {
      popularContainer.innerHTML =
        "<p>Unable to load popular recipes. Check your connection.</p>";
    }
  }

  // Load popular recipes on desktop
  const desktopGrid = document.getElementById("desktop-popular");
  if (desktopGrid) {
    try {
      const recipes = await searchRecipesByIngredients([
        "rice",
        "chicken",
        "pepper",
      ]);
      renderRecipeCards(recipes, desktopGrid, "desktop");
    } catch {
      desktopGrid.innerHTML = "<p>Unable to load.</p>";
    }
  }

  // Ingredient input autosuggest
  const input = document.getElementById("ingredient-input");
  const suggestions = document.getElementById("suggestions");
  if (input && suggestions) {
    // Add aria-autocomplete attributes
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-controls", "suggestions");
    input.setAttribute("aria-expanded", "false");
    
    input.addEventListener("input", (e) => {
      const val = e.target.value.toLowerCase().trim();
      if (val.length < 1) {
        suggestions.classList.remove("active");
        input.setAttribute("aria-expanded", "false");
        return;
      }
      const matches = Object.keys(ingredientMapping)
        .filter((name) => name.toLowerCase().includes(val))
        .slice(0, 5);
      if (matches.length) {
        suggestions.innerHTML = matches
          .map((m) => `<div class="suggestion-item" role="option">${m}</div>`)
          .join("");
        suggestions.classList.add("active");
        input.setAttribute("aria-expanded", "true");
      } else {
        suggestions.classList.remove("active");
        input.setAttribute("aria-expanded", "false");
      }
    });

    suggestions.addEventListener("click", (e) => {
      if (e.target.classList.contains("suggestion-item")) {
        const ingredient = e.target.textContent.trim();
        addIngredient(ingredient);
        input.value = "";
        suggestions.classList.remove("active");
        input.setAttribute("aria-expanded", "false");
        input.focus();
      }
    });
  }

  function addIngredient(ing) {
    const normalized = ingredientMapping[ing] || ing;
    updateSelectedIngredients(normalized, true);
  }

  // Nigerian Specials button - use navigateTo for immediate page update
  document
    .getElementById("nigerian-specials")
    ?.addEventListener("click", () => {
      navigateTo("/recipe/?category=Nigerian");
    });

  // Manage pantry button (desktop)
  document
    .querySelector(".manage-btn")
    ?.addEventListener("click", openPantryModal);

  // Menu toggle button (mobile) - handled by main.mjs but add visual feedback
  document
    .querySelector(".menu-toggle")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
    });

  // Add ingredient button (mobile)
  document
    .querySelector(".add-ingredient-btn")
    ?.addEventListener("click", () => {
      // Focus on the input field to show suggestions
      const input = document.getElementById("ingredient-input");
      if (input) input.focus();
    });

  // Desktop icon buttons (profile, notifications) - with visual feedback and interactive menus
  document.querySelectorAll(".icon-btn").forEach((btn) => {
    const label = btn.getAttribute("aria-label");
    
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Add visual feedback
      btn.style.transform = "scale(0.95)";
      setTimeout(() => {
        btn.style.transform = "scale(1)";
      }, 100);
      
      if (label === "Notifications") {
        showNotificationMenu(btn);
      } else if (label === "Profile") {
        showProfileMenu(btn);
      }
    });
  });
  
  function showNotificationMenu(btn) {
    // Remove existing menu if present
    const existingMenu = document.querySelector(".notification-menu");
    if (existingMenu) {
      existingMenu.remove();
      return;
    }
    
    const menu = document.createElement("div");
    menu.className = "notification-menu";
    menu.innerHTML = `
      <div class="notification-item">
        <strong>Recipe Saved</strong>
        <small>You saved Jollof Rice to favorites</small>
      </div>
      <div class="notification-divider"></div>
      <div class="notification-item">
        <strong>Welcome Back!</strong>
        <small>Complete your pantry setup</small>
      </div>
      <div class="notification-footer">
        <a href="#" style="color: #008751; font-size: 12px;">View all notifications</a>
      </div>
    `;
    menu.style.cssText = `
      position: fixed;
      top: 60px;
      right: 20px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      width: 280px;
      z-index: 1000;
      font-family: 'Open Sans', sans-serif;
      font-size: 13px;
    `;
    document.body.appendChild(menu);
    
    // Close menu when clicking outside
    setTimeout(() => {
      document.addEventListener("click", function closeMenu(e) {
        if (!menu.contains(e.target) && !btn.contains(e.target)) {
          menu.remove();
          document.removeEventListener("click", closeMenu);
        }
      });
    }, 0);
  }
  
  function showProfileMenu(btn) {
    // Remove existing menu if present
    const existingMenu = document.querySelector(".profile-menu");
    if (existingMenu) {
      existingMenu.remove();
      return;
    }
    
    const menu = document.createElement("div");
    menu.className = "profile-menu";
    menu.innerHTML = `
      <div class="menu-header">
        <div style="font-size: 24px;">👤</div>
        <div>
          <div style="font-weight: bold; font-size: 14px;">Guest User</div>
          <div style="font-size: 12px; color: #666;">Welcome to Pantry Chef</div>
        </div>
      </div>
      <div class="menu-divider"></div>
      <div class="menu-item">📋 My Recipes</div>
      <div class="menu-item">⚙️ Settings</div>
      <div class="menu-item">❓ Help & Support</div>
      <div class="menu-divider"></div>
      <div class="menu-item" style="color: #d90000;">🚪 Sign Out</div>
    `;
    menu.style.cssText = `
      position: fixed;
      top: 60px;
      right: 20px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      width: 250px;
      z-index: 1000;
      font-family: 'Open Sans', sans-serif;
      font-size: 13px;
    `;
    document.body.appendChild(menu);
    
    // Add click handlers to menu items
    menu.querySelectorAll(".menu-item").forEach((item) => {
      item.style.cssText = `
        padding: 12px 16px;
        cursor: pointer;
        border-bottom: 1px solid #f0f0f0;
      `;
      item.addEventListener("mouseenter", () => {
        item.style.backgroundColor = "#f9f9f9";
      });
      item.addEventListener("mouseleave", () => {
        item.style.backgroundColor = "transparent";
      });
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        
        // Provide contextual feedback based on menu item
        const itemText = item.textContent.trim();
        if (itemText.includes("My Recipes")) {
          alert("📋 Your saved recipes will appear here. Start by saving recipes to your favorites! (❤️ button on recipe details)");
        } else if (itemText.includes("Settings")) {
          alert("⚙️ Settings options:\n• Dark mode (available via ☀️ button in header)\n• Notification preferences\n• Unit preferences (coming soon)");
        } else if (itemText.includes("Help")) {
          alert("❓ Help & Support:\n\n1. Search recipes by ingredient\n2. Use filters to narrow results\n3. View nutrition info on recipe details\n4. Save favorites for quick access\n5. Share recipes with friends\n\nFor additional help, visit our GitHub: S-A-oghene/pantry-chef");
        } else if (itemText.includes("Sign Out")) {
          alert("🚪 You're currently using Pantry Chef as a guest. All your favorites are stored locally in your browser.");
        }
        
        menu.remove();
      });
    });
    
    // Close menu when clicking outside
    setTimeout(() => {
      document.addEventListener("click", function closeMenu(e) {
        if (!menu.contains(e.target) && !btn.contains(e.target)) {
          menu.remove();
          document.removeEventListener("click", closeMenu);
        }
      });
    }, 0);
  }

  // Form submit
  const form = document.getElementById("ingredient-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const ingredients = getSelectedIngredients();
    if (ingredients.length === 0) {
      // Show error message to user
      const input = document.getElementById("ingredient-input");
      input?.setAttribute("aria-invalid", "true");
      input?.setAttribute("aria-describedby", "ingredient-error");
      
      // Create error message if it doesn't exist
      let errorMsg = document.getElementById("ingredient-error");
      if (!errorMsg) {
        errorMsg = document.createElement("div");
        errorMsg.id = "ingredient-error";
        errorMsg.className = "error-message";
        errorMsg.role = "alert";
        input?.parentElement?.appendChild(errorMsg);
      }
      errorMsg.textContent = "Please add at least one ingredient to search.";
      errorMsg.style.display = "block";
      input?.focus();
      return;
    }
    navigateTo(`/recipe/?ingredients=${encodeURIComponent(ingredients.join(","))}`);
  });

  // View all recipes button
  document.querySelector(".view-all-btn")?.addEventListener("click", () => {
    navigateTo("/recipe/");
  });
}

// Function to check and display API status
function checkAndDisplayAPIStatus() {
  const statusBanner = document.getElementById("api-status");
  const statusText = document.getElementById("api-status-text");
  
  if (!statusBanner || !statusText) return;
  
  // Check TheMealDB API
  fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=rice", {
    method: "HEAD",
    mode: "no-cors"
  }).then(() => {
    let statusMessage = "✅ TheMealDB API: Connected";
    let hasFullFunctionality = false;
    
    // Check Edamam API configuration
    if (API_KEYS?.EDAMAM?.APP_ID && API_KEYS?.EDAMAM?.APP_KEY) {
      statusMessage += " | ✅ Edamam API: Configured";
      hasFullFunctionality = true;
    } else {
      statusMessage += " | ⚠️ Edamam API: Not configured";
    }
    
    statusText.textContent = statusMessage;
    statusBanner.style.display = "block";
    statusBanner.style.backgroundColor = hasFullFunctionality ? "#e8f5e9" : "#fff8e1";
    statusBanner.style.borderColor = hasFullFunctionality ? "#4caf50" : "#fbc02d";
    statusBanner.style.color = hasFullFunctionality ? "#2e7d32" : "#f57f17";
    statusBanner.style.cursor = "pointer";
    
    // Add click handler for more info
    statusBanner.addEventListener("click", () => {
      if (!hasFullFunctionality) {
        alert("📊 Nutrition Features Status:\n\n✅ Recipe search: Fully functional (TheMealDB)\n✅ Recipe details: Fully functional\n✅ Favorites & tips: Fully functional\n\n⚠️ Advanced nutrition analysis (Edamam API) requires configuration:\n\n1. Get free API keys from:\n   https://developer.edamam.com/\n\n2. Update src/js/config.mjs with your keys\n\n3. Restart development server\n\nWithout Edamam, nutrition info uses mock data.\nCore recipe features work perfectly!");
      } else {
        alert("✅ All features fully operational!\n\nTheMealDB: Recipe data & search ✓\nEdamam: Nutrition analysis ✓\n\nEnjoy exploring Nigerian recipes!");
      }
    });
    
    // Auto-hide after 8 seconds
    setTimeout(() => {
      statusBanner.style.opacity = "0";
      statusBanner.style.transition = "opacity 0.3s ease";
      setTimeout(() => {
        statusBanner.style.display = "none";
      }, 300);
    }, 8000);
  }).catch(() => {
    statusText.textContent = "⚠️ Network error: Check your connection or API availability";
    statusBanner.style.display = "block";
    statusBanner.style.backgroundColor = "#fff3e0";
    statusBanner.style.borderColor = "#ff9800";
    statusBanner.style.color = "#e65100";
  });
}
