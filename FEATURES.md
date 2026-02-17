# Features

Complete list of Pantry Chef features and how to use them.

## Mobile Features (320px-768px)

### Home Page
- **Logo & Menu** - Pantry Chef header with navigation toggle
- **Search Bar** - Type ingredient name, get auto-suggestions
- **Selected Ingredients** - Chips showing chosen ingredients with remove button
- **Nigerian Specials** - Quick button to view popular Nigerian recipes
- **Popular Recipes** - Grid showing trending recipes
- **Bottom Navigation** - Sticky 60px nav with: Home, Search, Favorites, Tips
- **Dark Mode Toggle** - Sun/moon button for dark/light theme

### Recipe Search Page
- **Back Button** - Navigate back to home
- **Settings Button** - Placeholder for future settings
- **Filter Buttons** - Filter by meal type (Breakfast, Lunch, Dinner) or cuisine (Nigerian)
- **Load More** - Load additional recipes (placeholder)
- **Recipe Cards** - 1-column grid with recipe image, name, match percentage

### Recipe Detail Page
- **Back Button** - Navigate to previous page
- **Favorite Button** - Save recipe (filled/outline heart icon)
- **Share Button** - Share via WhatsApp, Twitter, or copy link
- **Hero Image** - Large recipe photo (responsive)
- **Recipe Tabs** - Switch between Ingredients, Method, Nutrition
- **Ingredients List** - Checkboxes to mark items you have
- **Nigerian Conversions** - Traditional measures next to modern amounts
- **Method Steps** - Numbered cooking instructions
- **Nutrition Data** - Calories, macros (carbs/protein/fat), micronutrients
- **Print & Share Buttons** - Bottom action buttons

### Favorites Page
- **Header** - "❤️ My Saved Recipes"
- **Recipe Grid** - All saved recipes in 1-column layout
- **Empty State** - Message if no favorites

### Tips Page
- **Header** - "💡 Naija Pantry Tips"
- **Tip List** - Storage and cooking tips specific to Nigerian ingredients

## Desktop Features (1024px+)

### Home Page - 3-Column Dashboard
- **Left Sidebar** - Your Pantry section
  - Quick ingredient list (Rice, Chicken, Pepper, etc.)
  - Manage button (opens pantry modal)
  - Naija Tips dropdown
- **Center Column** - Recipe Discovery
  - Search bar
  - Recipe grid (2-3 columns)
  - View All Recipes button
- **Right Sidebar** - Information
  - Trending in Nigeria section
  - Nutrition Calculator
- **Desktop Header** - 70px header with:
  - Logo + text
  - Profile button
  - Notifications button
  - Dark mode toggle

### Pantry Management Modal
- **Search** - Find ingredients to add
- **Quick Selection** - Common ingredients (Rice, Beans, Oil, Salt, Chicken, etc.)
- **Pantry Items** - List of saved ingredients with:
  - Item name
  - Quantity
  - Edit button
  - Delete button
- **Action Buttons** - Save and Cancel

## Cross-Device Features

### Dark Mode
- **Toggle Button** - Click sun/moon icon to switch themes
- **Persistence** - Settings saved to localStorage
- **Full Coverage** - All pages adapt to dark mode:
  - Text colors invert
  - Background colors change
  - Buttons adapt
  - Cards adapt
  - Maintains readability

### Responsiveness
- **Mobile (320px)** - Single column, stacked layout, sticky header/nav
- **Tablet (768px)** - Slightly wider, optimized spacing
- **Desktop (1024px+)** - Full 3-column layout, desktop header
- **Fluid** - Smooth scaling between breakpoints

### Route-Based Features
- **URL Routing** - Navigate to pages via URLs
  - `/` - Home
  - `/recipe/` - Search
  - `/recipe/detail.html?id=123` - Recipe detail
  - `/favorites/` - Saved recipes
  - `/tips/` - Cooking tips

### Local Storage
- **Favorites** - Recipes saved to browser
- **Dark Mode** - Preference saved between sessions
- **Ingredient Input** - Recent searches (optional)

## API-Driven Features

### Recipe Search
- **TheMealDB API** - 2000+ recipes
- **Category Filtering** - Breakfast, Lunch, Dinner, Nigerian, etc.
- **Ingredient Search** - Find by ingredient name
- **Lazy Loading** - Load images as needed

### Nutritional Analysis
- **Edamam API** - Provides:
  - Total calories
  - Carbohydrates (g)
  - Protein (g)
  - Fat (g)
  - Micronutrients (Iron, Calcium, Vitamin C)
  - Dietary labels

### Recipe Details
- **Meals API Data**
  - Ingredients with measures
  - Step-by-step instructions
  - Recipe origin/category
  - Recipe tags

## Sharing & Social Features

### Share Recipes
- **WhatsApp** - Send recipe link to WhatsApp contacts
- **Native Share** - On mobile, uses system share sheet
- **Copy Link** - Copy recipe URL to clipboard
- **Twitter** - Share with custom message (future)

### Print Recipes
- **Print-Friendly Format** - Optimized for paper
- **Browser Print Dialog** - Ctrl+P / Cmd+P
- **Layout** - Recipe name, ingredients, method, nutrition

## Quality Features

### Performance
- **Lazy Loading** - Images load on demand
- **Caching** - API results cached in memory
- **Optimized Assets** - Minified CSS/JS in production
- **Fast Build** - Vite ensures quick rebuild times

### User Experience
- **Loading States** - Skeleton screens while data loads
- **Error Handling** - User-friendly error messages
- **Animations** - Smooth transitions and effects
  - Ingredient chip removal (0.3s shrink)
  - Tab switches (0.3s fade)
  - Progress bar fills
  - Shimmer loading effect

### Accessibility
- **Semantic HTML** - Proper heading hierarchy
- **ARIA Labels** - Buttons have descriptive labels
- **Alt Text** - Images have descriptions
- **Keyboard Navigation** - Clickable elements keyboard-accessible
- **Focus Indicators** - Visible focus states

## Nigerian-Specific Features

### Measurement Conversion
Converts cups to traditional Nigerian measures:
- **Derica** - Traditional serving bowl (≈1.25 cups)
- **Mudu** - Traditional grain measure (≈1.5 cups)
- **Cooking Spoon** - Large spoon (≈0.5 cup)

### Recipe Collections
- **Nigerian Specials** - Jollof Rice, Moi Moi, Suya, etc.
- **Trending in Nigeria** - What's popular right now
- **Regional Variants** - Different Nigerian cuisines

### Pantry Tips
- Storage advice for garri, beans, rice
- Ingredient matching tips
- Cooking shortcuts
- Nigerian ingredient substitutions

## Future Features (Roadmap)

### User Accounts
- Sign up / Login
- Cloud sync for favorites
- Personalized recommendations

### Meal Planning
- Weekly meal calendar
- Shopping list generation
- Budget tracking

### Advanced Search
- Filter by cooking time
- Filter by difficulty
- Dietary preferences (vegetarian, gluten-free, etc.)

### Community
- Share custom recipes
- Rate recipes
- Review comments
- Cooking forum

### Multimedia
- Recipe videos
- Step-by-step photo guides
- User-submitted photos

---

See [README.md](README.md) for quick start or [SETUP.md](SETUP.md) for installation.
