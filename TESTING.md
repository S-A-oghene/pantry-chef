# Testing Guide

Manual and automated testing procedures for Pantry Chef.

## Automated Testing

### Run Jest Tests

```bash
npm run test -- --watchAll=false
```

**Expected Output:**
```
PASS  src/test/example.test.js
  ✓ example test

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
```

**Current Coverage:**
- 1 test suite
- 1 test passing
- Example test validating setup

---

## Manual Testing Checklist

### Mobile Testing (375px viewport)

Open DevTools: **F12**
Device Toggle: **Ctrl+Shift+M** (or Cmd+Shift+M on Mac)
Select: **iPhone SE** (375px width)

**Header**
- [ ] Menu toggle (☰) button visible and responsive
- [ ] Logo text "Pantry Chef" readable
- [ ] Header height 60px
- [ ] Sticky (doesn't scroll away)

**Search**
- [ ] Input field full width, max-width 280px
- [ ] Placeholder text visible
- [ ] Suggestions appear as you type
- [ ] Can select suggestion (adds as chip)
- [ ] Search button responsive

**Ingredients**
- [ ] Ingredient chips show cleanly
- [ ] Remove (×) button works
- [ ] No horizontal scroll

**Buttons**
- [ ] "Nigerian Specials" button tappable
- [ ] Button text readable
- [ ] Proper height (44px minimum)

**Popular Recipes**
- [ ] Section heading visible
- [ ] Recipe cards in 1 column
- [ ] Cards responsive (full width, max 280px)
- [ ] Images load
- [ ] Can tap cards

**Bottom Navigation**
- [ ] 60px height
- [ ] Sticky at bottom
- [ ] 4 items visible: Home, Search, Faves, Tips
- [ ] Active tab highlighted
- [ ] Tap navigation works

**Dark Mode**
- [ ] Toggle button visible
- [ ] Dark mode applies to all elements
- [ ] Text remains readable in dark mode
- [ ] Setting persists on refresh

### Tablet Testing (768px viewport)

Select: **iPad** (768px width)

**Layout**
- [ ] Still uses mobile layout (single column)
- [ ] Spacing improved for tablet
- [ ] No horizontal scroll
- [ ] Touch targets adequate (44px+)

**Recipes**
- [ ] Recipe grid still 1-2 columns
- [ ] Cards readable
- [ ] Images properly sized

### Desktop Testing (1024px+ viewport)

Close device toggle
Maximize browser window (1920px width)

**Desktop Header**
- [ ] Header 70px tall
- [ ] Logo + app name visible
- [ ] Profile, notifications, dark mode buttons present
- [ ] Buttons clickable
- [ ] Mobile header hidden

**3-Column Dashboard**
- [ ] Left sidebar visible (256px width)
- [ ] Center column prominent
- [ ] Right sidebar visible (256px width)
- [ ] Proper spacing (1rem gaps)
- [ ] Centered on page

**Left Sidebar**
- [ ] "YOUR PANTRY" header
- [ ] Ingredient list shows
- [ ] Manage button clickable
- [ ] Naija Tips section visible

**Center Column**
- [ ] Desktop search bar visible (max 448px)
- [ ] Recipe grid 2-3 columns wide
- [ ] "VIEW ALL RECIPES" button present

**Right Sidebar**
- [ ] "TRENDING IN NIGERIA" visible
- [ ] Nutrition calculator visible
- [ ] Meal selector functional

---

## Feature Testing

### Search & Discovery

**On Home Page:**
1. Start typing ingredient: "chicken"
   - [ ] Suggestions appear
   - [ ] Can click a suggestion
   - [ ] Ingredient added as chip
   - [ ] Ingredient displays in selected area

2. Click "Nigerian Specials"
   - [ ] Redirects to /recipe/?category=Nigerian
   - [ ] Recipes load
   - [ ] All are Nigerian dishes

**On Recipe Search Page:**
1. Type ingredients: "rice"
   - [ ] Filter recipes by ingredient
   - [ ] Results count shows
   - [ ] Recipe cards display

2. Click filter buttons
   - [ ] Filter applies
   - [ ] Button highlights
   - [ ] Results update

3. Click recipe card
   - [ ] Navigate to detail page
   - [ ] Recipe ID in URL

---

### Recipe Detail

**Viewing Recipe**
1. Click any recipe from search or home
2. Recipe Detail page loads:
   - [ ] Hero image shows
   - [ ] Title displays
   - [ ] Tags show
   - [ ] Stats visible (time, servings, difficulty)

**Ingredients Tab** (active by default)
- [ ] List shows all ingredients
- [ ] Measures display correctly
- [ ] Nigerian conversions show (e.g., "approx. 1 derica")
- [ ] Can check ingredients (checkbox works)

**Method Tab**
1. Click "METHOD" tab
   - [ ] Tab highlights
   - [ ] Ingredients hidden
   - [ ] Steps display numbered
   - [ ] Each step clear and readable

**Nutrition Tab**
1. Click "NUTRITION" tab
   - [ ] Calories display
   - [ ] Daily value percentage shows
   - [ ] Macro circles (carbs, protein, fat) visible
   - [ ] Progress bars show (Iron, Calcium, Vitamin C)
   - [ ] Dietary labels display

**Buttons**
- [ ] Heart (❤️) button - Click to favorites, persists
- [ ] Share (📤) button - Click opens share options
- [ ] Print (🖨️) button - Opens print preview
- [ ] Back button (←) - Returns to previous page

---

### Favorites System

**Adding Favorites:**
1. On recipe detail, click heart (❤️) button
   - [ ] Heart style changes (filled/outline)
   - [ ] Visual feedback immediate

2. Go to Favorites page
   - [ ] Saved recipe appears
   - [ ] Can view its details
   - [ ] Can remove from favorites

3. Refresh page (F5)
   - [ ] Favorite still shows (localStorage working)

**Multiple Favorites:**
1. Save 3-5 recipes
2. Go to Favorites
   - [ ] All recipes display
   - [ ] Grid shows properly

---

### Dark Mode

**Toggle Dark Mode:**
1. Click sun/moon button (🌙/☀️)
   - [ ] Entire page inverts
   - [ ] Text readable (good contrast)
   - [ ] Images visible
   - [ ] Buttons clickable

2. Reload page (F5)
   - [ ] Dark mode persists
   - [ ] localStorage working

3. Toggle back to light
   - [ ] Properly returns
   - [ ] Persists on reload

---

### Responsiveness During Use

1. Open home page (desktop)
2. Resize browser window slowly:
   - [ ] At 1024px: Switch from mobile to desktop layout
   - [ ] Desktop dashboard appears
   - [ ] No overlapping elements
   - [ ] Text remains readable

3. Go to recipe search
4. Resize window:
   - [ ] Layout adapts smoothly
   - [ ] No horizontal scroll
   - [ ] Touch targets remain adequate

---

## API Testing

### TheMealDB (Recipe Data)

1. **Search request:**
   - Open home page
   - Check console (F12 > Network)
   - Look for requests to themealdb.com
   - [ ] Recipes load successfully
   - [ ] Images valid

2. **No errors:**
   - [ ] Console shows no errors
   - [ ] No 404 responses

### Edamam (Nutrition Data)

1. **On Recipe Detail page:**
   - Click Nutrition tab
   - Check Network tab (F12)
   - [ ] Request to api.edamam.com succeeds
   - [ ] Nutrition data displays
   - [ ] All fields populated

2. **If API slow:**
   - Nutrition tab shows "Loading..."
   - Data eventually loads
   - Page doesn't break

---

## Browser Compatibility

### Test Browsers

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ Tested |
| Firefox | Latest | ✅ Tested |
| Safari | 15+ | ✅ Tested |
| Edge | Latest | ✅ Tested |

**Test in each browser:**
- [ ] Pages render correctly
- [ ] No JavaScript errors
- [ ] All buttons work
- [ ] Dark mode works
- [ ] Favorites persist
- [ ] Share buttons work

---

## Performance Testing

### Loading Speed

1. Open DevTools (F12)
2. Go to Network tab
3. Clear cache (Ctrl+Shift+Delete)
4. Load home page
   - [ ] First load < 3 seconds
   - [ ] Subsequent loads < 1 second

### Images

1. Check Images tab in DevTools
   - [ ] Recipe images load
   - [ ] Images properly sized
   - [ ] No broken images (red X)

### Console Errors

1. Open Console tab (F12 > Console)
2. Load each page
   - [ ] No red error messages
   - [ ] Only normal logs/warnings
   - [ ] No failed API calls

---

## Test Summary

**All tests complete when:**
- ✅ Jest tests passing
- ✅ Manual checklist complete 100%
- ✅ No console errors
- ✅ All features functional
- ✅ Responsive on all breakpoints
- ✅ APIs returning data
- ✅ Buttons all responsive

---

See [README.md](README.md) for project overview.
