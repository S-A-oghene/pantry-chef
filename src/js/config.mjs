export const API_KEYS = {
  THE_MEAL_DB: "", // optional (public API)
  EDAMAM: {
    APP_ID: import.meta.env.VITE_EDAMAM_APP_ID || "", // Get from .env.local file
    APP_KEY: import.meta.env.VITE_EDAMAM_APP_KEY || "", // Get from .env.local file
  },
};
