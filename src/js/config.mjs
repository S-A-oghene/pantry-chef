// Configuration for API Keys
// Environment variables are loaded from .env.local (not committed to Git)
// If not using environment variables, you can edit this file directly

export const API_KEYS = {
  THE_MEAL_DB: "", // optional (public API)
  EDAMAM: {
    // Method 1: Load from environment variables (recommended for production)
    // APP_ID: import.meta.env.VITE_EDAMAM_APP_ID || "",
    // APP_KEY: import.meta.env.VITE_EDAMAM_APP_KEY || "",
    
    // Method 2: Direct configuration (for development/testing)
    // Add your credentials here only for local development
    APP_ID: "e840f874",
    APP_KEY: "bbad6dbf9019c6594f811ae8939a8c18",
  },
};

// Debug logging
console.log("🍳 Pantry Chef API Configuration:");
console.log("✅ TheMealDB API: Always enabled (public)");
if (API_KEYS.EDAMAM?.APP_ID && API_KEYS.EDAMAM?.APP_KEY) {
  console.log("✅ Edamam API: Enabled with credentials");
} else {
  console.log("⚠️ Edamam API: Not configured - using mock nutrition data");
}
