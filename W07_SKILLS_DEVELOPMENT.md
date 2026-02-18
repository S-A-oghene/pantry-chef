# WDD 330 Skills Development Document

**Name:** S-A Oghene  
**Course:** WDD 330 - Web Application Development  
**Semester:** Spring 2026  
**Project:** Pantry Chef – Nigerian Recipe Application

**Video Link:** [To be provided - demo video link]  
**Working Application Link:** https://S-A-oghene.github.io/pantry-chef/  
**GitHub Source URL:** https://github.com/S-A-oghene/pantry-chef  
**Trello Board URL:** [To be linked when available]

---

## Course Outcomes

The following are the course outcomes of WDD 330:

1. Become more efficient at applying your innate curiosity and creativity.
2. Become more dexterous at exploring your environment.
3. Become a person who enjoys helping and learning from others.
4. Use a divide and conquer approach to design solutions for programming problems.
5. Finding and troubleshooting bugs you and others will have in the code you write.
6. **Developing and debugging HTML, CSS, and JavaScript programs that use medium complexity web technologies.**

---

## Learning Objective Assessment

This outcome is demonstrated by skill in the following learning objectives:

| Objective            | Weight |     Status      | Details                                                                                   |
| -------------------- | :----: | :-------------: | ----------------------------------------------------------------------------------------- |
| **JavaScript**       |  25%   |   **MASTERY**   | Robust programming logic demonstrated throughout. See examples below.                     |
| **Third-party APIs** |  15%   |   **MASTERY**   | Extensive integration with TheMealDB and Edamam APIs. See examples below.                 |
| **JSON**             |  15%   | **PROFICIENCY** | Comprehensive JSON processing for dynamic updates. See examples below.                    |
| **CSS**              |  15%   | **PROFICIENCY** | Effective use of transforms, transitions, and responsive design. See examples below.      |
| **Events**           |  15%   |   **MASTERY**   | Extensive event handling for rich user interactions. See examples below.                  |
| **Local Storage**    |   5%   | **PROFICIENCY** | Effective persistent data storage for user preferences and favorites. See examples below. |

---

## Detailed Learning Objectives

### 1. JavaScript (25%) - **MASTERY**

**Description:**  
Pantry Chef demonstrates robust programming logic throughout the application, including:

- Data validation and manipulation
- Complex array operations and filtering
- Dynamic DOM manipulation and element creation
- Event handling and callback functions
- Module patterns and ES6+ features
- Asynchronous programming with async/await
- Conditional logic and state management

**Where can this be seen in your final personal project application?**

| Code Location                                                                                                          | JavaScript Skill Demonstrated                                                                                                                                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [src/js/recipeSearch.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/recipeSearch.mjs)                 | **Pagination logic**: Manages `allRecipes` array and `displayedCount` state. Shows "Load More" button based on remaining items. Slices array with `allRecipes.slice(displayedCount, displayedCount + itemsPerPage)`. Demonstrates array manipulation, state management, and conditional rendering. |
| [src/js/home.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/home.mjs) - Lines 209-300                 | **Interactive menu system**: Creates DOM elements dynamically, attaches event listeners for click handling, implements auto-closing with click-outside detection. Uses `document.createElement()`, `addEventListener()`, and closure patterns.                                                     |
| [src/js/apiService.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/apiService.mjs) - Lines 50-130      | **Async API calls with error handling**: Uses `async/await` for network requests with timeout detection, error handling with try/catch blocks, and implements caching logic with Map data structure.                                                                                               |
| [src/js/localStorageManager.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/localStorageManager.mjs)   | **Complex data operations**: Implements CRUD operations (Create, Read, Update, Delete) for LocalStorage. Handles JSON serialization/deserialization, data compression, and cleanup of expired entries.                                                                                             |
| [src/js/measurementConverter.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/measurementConverter.mjs) | **Data transformation logic**: Converts between measurement systems using mathematical calculations and lookup tables. Handles edge cases like fractional ounces and cup variations.                                                                                                               |
| [src/js/main.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/main.mjs) - Lines 8-35                    | **Router function with advanced logic**: Analyzes `window.location.pathname`, handles GitHub Pages subdirectory (`/pantry-chef/`), normalizes paths, and dispatches to appropriate page initializer. Demonstrates complex conditional logic.                                                       |
| [src/js/home.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/home.mjs) - Lines 140-160                 | **Form validation**: Validates user input, provides error messages via ARIA attributes, manages focus management. Shows defensive programming with null checks and error handling.                                                                                                                 |

**Specific Examples:**

1. **Validation**: User must add at least one ingredient before searching (line 141-160 in home.mjs)
2. **Array Operations**: Filtering recipe results by cuisine type, sorting by rating
3. **Dynamic DOM**: Creating menu items, adding/removing classes, updating text content based on state
4. **Event Management**: Form submit handlers, button click handlers, keyboard navigation
5. **Module Pattern**: All JavaScript is organized as ES6 modules with explicit exports
6. **Error Handling**: Network errors caught and handled gracefully with fallback data

---

### 2. Third-party APIs (15%) - **MASTERY**

**Description:**  
Pantry Chef effectively uses two third-party APIs with rich JSON data:

- **TheMealDB API**: Public recipe database with search, filtering, and detail endpoints
- **Edamam Nutrition API**: Advanced nutritional analysis with detailed macro/micronutrient data

Implements robust error handling, caching, timeouts, and graceful fallback to mock data.

**Where can this be seen in your final personal project application?**

| API Integration                                                                                                             | Details                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **TheMealDB Integration** [apiService.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/apiService.mjs#L23)   | Uses 4 endpoints: `filter.php?i={ingredient}` (search by ingredient), `lookup.php?i={id}` (recipe details), `search.php?s={name}` (search by name), `random.php` (random recipe). Handles response parsing and error conditions. |
| **Edamam Integration** [apiService.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/apiService.mjs#L115-140) | Uses nutrition-details endpoint with app_id and app_key authentication. Sends ingredients in specific format, parses nutritional response with macro/micronutrients.                                                             |
| **Caching System** [apiService.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/apiService.mjs#L6-20)        | Implements 1-hour TTL cache using JavaScript Map. First checks cache before making API call, reducing load and supporting offline-capable app.                                                                                   |
| **Error Handling** [apiService.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/apiService.mjs#L95-140)      | Catches network errors, checks API response status codes, handles timeout scenarios, falls back to mock data when APIs fail.                                                                                                     |
| **Timeout Detection** [apiService.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/apiService.mjs#L110-115)  | Implements 10-second timeout for API requests using `Promise.race()` with timeout promise.                                                                                                                                       |
| **Live Status Display** [home.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/home.mjs#L327-360)            | Checks API connectivity and displays real-time status banner showing which APIs are available.                                                                                                                                   |

**Live Examples - Test These:**

1. **Search by ingredient** (home page input): Uses TheMealDB filter endpoint
2. **Recipe details** (click any recipe): Uses TheMealDB lookup endpoint
3. **Nutrition tab** (on recipe detail): Uses Edamam nutrition endpoint
4. **Nigerian Specials button**: Searches using TheMealDB search endpoint with "Nigerian" category
5. **Offline fallback**: Disable internet and check console—app still shows mock nutrition data

---

### 3. JSON (15%) - **PROFICIENCY**

**Description:**  
Demonstrates skill processing JSON data to dynamically update the website. Handles API responses, parses nested JSON objects, and transforms data for display.

**Where can this be seen in your final personal project application?**

| Location                                                                                                                                  | JSON Processing                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Recipe Display** [recipeSearch.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/recipeSearch.mjs#L140-160)               | Receives JSON array of recipes from API, maps over array to extract properties (id, name, image), passes to rendering function. Each recipe is a JSON object with meal properties.                  |
| **Recipe Detail** [recipeDetail.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/recipeDetail.mjs#L20-50)                  | Parses JSON response with complex nested structure: meal object containing ingredients (object array), instructions (string), measurements, images, etc. Extracts and displays specific properties. |
| **Nutrition Data** [apiService.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/apiService.mjs#L140-160)                   | Edamam API returns deeply nested JSON with nutrition data. Extracts totalNutrients object, maps over keys to display individual nutrients with values and units.                                    |
| **LocalStorage JSON** [localStorageManager.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/localStorageManager.mjs#L5-20) | Serializes favorite recipes to JSON before storing, parses JSON back into JavaScript objects on retrieval. Handles `JSON.stringify()` and `JSON.parse()` properly.                                  |
| **Favorites Array** [recipeDetail.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/recipeDetail.mjs#L70-90)                | Manages JSON array of favorite recipe objects, performs array operations (find, includes, filter), updates DOM based on array state.                                                                |
| **Measurement Mapping** [ingredientMap.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/ingredientMap.mjs)                 | Uses JSON-like object mapping Nigerian ingredient names to English equivalents. Iterates over object keys to match user-entered ingredients.                                                        |

**Live Examples - Test These:**

1. **Search recipes**: Watch network tab—see JSON response with meal array. App parses and displays data dynamically.
2. **Click recipe detail**: More complex JSON structure with ingredients array.
3. **Click Nutrition tab**: Deeply nested nutrition JSON is parsed and displayed in table format.
4. **Save to favorites**: JSON serialized and stored, parse and retrieve to verify data persists.

---

### 4. CSS (15%) - **PROFICIENCY**

**Description:**  
Appropriate use of CSS transforms, transitions, responsive design, and visual styling. Includes focus states, hover effects, animations, and mobile-first approach.

**Where can this be seen in your final personal project application?**

| CSS Feature                                                                                                     | Where                                 | Details                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Responsive Design** [style.css](https://github.com/S-A-oghene/pantry-chef/blob/main/src/css/style.css#L1-50)  | Entire application                    | Mobile-first CSS with breakpoints at 768px and 1024px. CSS Grid for recipe cards, Flexbox for navigation. Tested on devices from 320px to 2560px. |
| **Hover Effects** [style.css](https://github.com/S-A-oghene/pantry-chef/blob/main/src/css/style.css#L100-150)   | Recipe cards, buttons                 | Recipe cards scale up 5% on hover with shadow deepening. Buttons change background color and cursor on hover, providing visual feedback.          |
| **Transforms** [style.css](https://github.com/S-A-oghene/pantry-chef/blob/main/src/css/style.css#L300-330)      | Menu opening, icon interaction        | Profile/notification menus use `transform: translateY()` for smooth appearance. Icon buttons scale on click (0.95x) then back to 1x.              |
| **Transitions** [style.css](https://github.com/S-A-oghene/pantry-chef/blob/main/src/css/style.css#L250-280)     | All interactive elements              | Smooth transitions on opacity (menu fade), background-color (button hover), transform properties. Using `transition: all 0.3s ease`.              |
| **CSS Variables** [style.css](https://github.com/S-A-oghene/pantry-chef/blob/main/src/css/style.css#L1-30)      | Entire application                    | Using CSS custom properties for colors, spacing, fonts. Enables dark mode toggle by switching variable values.                                    |
| **Dark Mode** [style.css](https://github.com/S-A-oghene/pantry-chef/blob/main/src/css/style.css#L350-400)       | Entire application                    | CSS variable overrides for dark mode. Includes prefers-color-scheme media query for system preference detection.                                  |
| **Focus States** [style.css](https://github.com/S-A-oghene/pantry-chef/blob/main/src/css/style.css#L150-170)    | All interactive elements              | All buttons and inputs have visible focus rings for keyboard navigation accessibility.                                                            |
| **Shadows & Depth** [style.css](https://github.com/S-A-oghene/pantry-chef/blob/main/src/css/style.css#L200-220) | Cards, menus, input fields            | Uses `box-shadow` for elevation: recipe cards have subtle shadow, menus have deeper shadow, input fields shadow on focus.                         |
| **Grid Layout** [style.css](https://github.com/S-A-oghene/pantry-chef/blob/main/src/css/style.css#L50-100)      | Recipe results, favorites             | CSS Grid with auto-fit columns: responsive recipe card layout that adapts from 1 column (mobile) to 4 columns (desktop).                          |
| **Flexbox** [style.css](https://github.com/S-A-oghene/pantry-chef/blob/main/src/css/style.css#L100-150)         | Navigation, headers, ingredients list | Flexible layouts using flex-direction, justify-content, align-items for proper alignment across all screen sizes.                                 |
| **Input Focus** [style.css](https://github.com/S-A-oghene/pantry-chef/blob/main/src/css/style.css#L170-190)     | Ingredient search box                 | Enlarges on focus (20% bigger) and shrinks on blur, with smooth transition. Color darkens on focus for visual feedback.                           |

**Live Examples - Test These:**

1. **Responsive design**: Resize browser window and watch layout adapt at breakpoints
2. **Hover effects**: Hover over recipe cards and buttons to see scale/color changes
3. **Focus states**: Tab through the application—all interactive elements have visible focus rings
4. **Dark mode**: Click sun icon (☀️) in header to toggle dark mode
5. **Input field**: Click ingredient search box—it grows and color darkens
6. **Menu transitions**: Click profile icon—menu appears smoothly with fade transition
7. **Mobile view**: Open on phone or use DevTools device emulation—everything adjusts

---

### 5. Events (15%) - **MASTERY**

**Description:**  
Extensive use of events to enhance user experience. Click handlers, form submissions, keyboard navigation, window events, and custom event handling.

**Where can this be seen in your final personal project application?**

| Event Type                                                                                                                                                                                         | Location                                | Details                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Click Events** [home.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/home.mjs#L150-170)                                                                                          | Profile/notification icons, all buttons | Event delegation: attach listener to icon, check event target, show appropriate menu. Multiple click handlers for different buttons with specific actions. |
| **Form Submit** [home.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/home.mjs#L290-310)                                                                                           | Ingredient search form (home page)      | Prevent default submission, validate input, extract form data, navigate to recipe page with query parameters. Shows proper form handling.                  |
| **Input Events** [home.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/home.mjs#L60-80)                                                                                            | Ingredient search box                   | Real-time input validation: as user types, show suggestions filtered from ingredient database. Uses `input` event for live filtering.                      |
| **Keyboard Events** [recipeDetail.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/recipeDetail.mjs#L40-70)                                                                         | Recipe detail tabs                      | Arrow keys navigate between tabs, Enter selects tab. Keyboard-only navigation without mouse required.                                                      |
| **Focus Events** [style.css](https://github.com/S-A-oghene/pantry-chef/blob/main/src/css/style.css#L170-190) + [home.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/home.mjs#L65) | Input field                             | On focus: field enlarges, color darkens, suggestions show. On blur: field shrinks, color returns normal. Demonstrates focus/blur event handling.           |
| **Click-Outside Detection** [home.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/home.mjs#L260-280)                                                                               | Profile/notification menus              | Attaches document click listener that closes menu when clicking outside. Removes listener after menu closes to prevent memory leaks.                       |
| **Popstate Event** [main.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/main.mjs#L38-40)                                                                                          | Window history                          | Browser back/forward buttons trigger popstate. Routes to appropriate page based on new location.                                                           |
| **Change Events** [home.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/uiAnimations.mjs#L5-20)                                                                                    | Dark mode toggle                        | Change event on checkbox input triggers CSS variable updates for dark mode switching.                                                                      |
| **Load Events** [main.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/main.mjs#L45-60)                                                                                             | DOMContentLoaded                        | Window DOMContentLoaded event fires once DOM is ready. Initializes router, loads favorites, applies dark mode, sets up all event listeners.                |
| **Error Handling** [apiService.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/apiService.mjs#L95-140)                                                                             | API calls                               | Try/catch blocks handle errors from API requests. Fallback events trigger when APIs fail.                                                                  |

**Interactive Examples - Test These:**

1. **Search form**: Type in ingredient box (input event) → suggestions appear. Submit form (form event) → navigate to results.
2. **Click profile icon**: Click event → menu appears. Click outside (document click event) → menu disappears.
3. **Keyboard navigation**: Press Tab to focus elements (focus event) → visible focus ring. On recipe detail, press arrow keys → tabs change.
4. **Dark mode toggle**: Click sun icon (change event) → page transforms to dark colors.
5. **Favorites**: Click heart button (click event) → favorite status updates, heart fills/empties with animation.
6. **Recipe tabs**: Click or arrow key between tabs. Enter key selects. Keyboard-only navigation possible.
7. **Auto-hide banner**: API status banner appears on load (load event) → automatically disappears after 8 seconds (timeout event).

---

### 6. Local Storage (5%) - **PROFICIENCY**

**Description:**  
Local storage is used effectively to persist user data across sessions without requiring authentication or server-side storage.

**Where can this be seen in your final personal project application?**

| Feature                                                                                                                                     | Location                          | Details                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Favorite Recipes** [localStorageManager.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/localStorageManager.mjs#L30-60)   | Save/load in recipeDetail.mjs     | Saves recipe object (id, name, image, cooking time) to `favorites` key. When user navigates to recipe, checks LocalStorage to highlight heart icon if already favorited. Survives browser restarts. |
| **Dark Mode Preference** [uiAnimations.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/uiAnimations.mjs#L5-30)              | Load on page init, save on toggle | Stores `darkMode: true/false` in LocalStorage. On page load, applies saved preference before rendering. On toggle, updates both DOM and LocalStorage.                                               |
| **Recent Searches** [localStorageManager.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/localStorageManager.mjs#L70-90)    | Home page suggestions             | Stores last 10 searches in `recentSearches` array. Shows quick access to previous ingredient searches.                                                                                              |
| **Data Expiration** [localStorageManager.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/localStorageManager.mjs#L100-120)  | Cleanup function                  | Stores timestamp with each item. Old data (> 30 days) is automatically removed to manage storage quota.                                                                                             |
| **JSON Serialization** [localStorageManager.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/localStorageManager.mjs#L15-25) | All storage operations            | All objects are properly serialized with `JSON.stringify()` before storing. Retrieved with `JSON.parse()` to restore object structure.                                                              |
| **Error Handling** [localStorageManager.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/localStorageManager.mjs#L110-130)   | Try/catch on all operations       | Checks if LocalStorage is available (some browsers may restrict it). Silently fails gracefully if quota exceeded or access denied.                                                                  |
| **Storage Quota Check** [recipeDetail.mjs](https://github.com/S-A-oghene/pantry-chef/blob/main/src/js/recipeDetail.mjs#L120-140)            | Favorite saving                   | Before saving new favorite, checks available storage. If full, prompts user to clear old data or just warns gracefully.                                                                             |

**Live Examples - Test These:**

1. **Save favorites**: Click heart (❤️) on any recipe detail → favorite saved. Close browser and reopen → favorite still shows (persisted in LocalStorage).
2. **Dark mode**: Toggle dark mode (sun icon) → setting saved. Close browser and reopen → dark mode preference remembered.
3. **Recent searches**: Search for ingredients on home page → they appear in suggestion dropdown. These persist across sessions.
4. **LocalStorage inspection**: Open browser DevTools → Application/Storage tab → LocalStorage → see `favorites`, `darkMode`, `recentSearches` keys with data.
5. **Data persistence**: Make changes (add favorites, enable dark mode) → hard refresh page (Ctrl+Shift+R) → all changes still there (from LocalStorage, not from server).

---

## Summary of Learning Objectives

| Objective            |   Rating    | Evidence                                                                                                                                      |
| -------------------- | :---------: | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **JavaScript**       |   MASTERY   | Complex logic throughout: pagination, async API calls, interactive menus, form validation, array operations, event handling, state management |
| **Third-party APIs** |   MASTERY   | Two APIs integrated (TheMealDB, Edamam) with robust error handling, caching, timeouts, and graceful fallbacks                                 |
| **JSON**             | PROFICIENCY | Effective JSON processing: parsing API responses, transforming data for display, storing/retrieving complex objects                           |
| **CSS**              | PROFICIENCY | Responsive mobile-first design, transforms, transitions, hover effects, dark mode, CSS Grid/Flexbox, accessibility focus states               |
| **Events**           |   MASTERY   | Comprehensive event handling: clicks, form submissions, keyboard navigation, focus/blur, popstate, custom interactions                        |
| **Local Storage**    | PROFICIENCY | Effective persistence of favorites, settings, search history with proper JSON serialization and error handling                                |

---

## Verification

✅ **Application is live and working**: https://S-A-oghene.github.io/pantry-chef/  
✅ **Source code accessible**: https://github.com/S-A-oghene/pantry-chef  
✅ **All links provided are working and rendering publicly**  
✅ **Code demonstrates medium complexity web technologies**  
✅ **Each learning objective demonstrated in multiple places**  
✅ **Real working examples at live link for testing**

---

## Conclusion

Pantry Chef demonstrates comprehensive mastery of all learning objectives. The application successfully integrates third-party APIs, processes JSON data dynamically, implements responsive design, handles complex user interactions through events, and persists user data effectively. The codebase quality, error handling, and attention to user experience reflect professional-level web development skills.
