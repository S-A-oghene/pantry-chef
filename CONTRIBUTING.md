# Contributing to Pantry Chef

Thank you for your interest in contributing to Pantry Chef! This guide will help you get started contributing to the project.

---

## Code of Conduct

Be respectful, inclusive, and professional in all interactions. We're building a community where everyone feels welcome to contribute.

---

## Getting Started

### Prerequisites

- **Node.js** 18.0+
- **npm** 10.0+
- **Git** 2.30+
- **GitHub Account**

### Setup Development Environment

```bash
# 1. Fork the repository
# Go to https://github.com/S-A-oghene/pantry-chef and click "Fork"

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/pantry-chef.git
cd pantry-chef

# 3. Add upstream remote (to sync with original)
git remote add upstream https://github.com/S-A-oghene/pantry-chef.git

# 4. Install dependencies
npm install

# 5. Create config.mjs with API keys
cp src/js/config.mjs.example src/js/config.mjs
# Edit config.mjs with your Edamam credentials

# 6. Start development server
npm start
```

### Verify Setup

```bash
# Check all tools work
npm run lint    # Should pass with 0 errors
npm run test    # Should pass 1/1 tests
npm run build   # Should create dist/ folder
```

---

## Development Workflow

### 1. Create a Feature Branch

```bash
# Update local main
git checkout main
git pull upstream main

# Create feature branch (use descriptive name)
git checkout -b feature/ingredient-autocomplete
# or
git checkout -b fix/search-button-disabled
# or
git checkout -b docs/add-api-guide
```

**Branch naming convention:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code improvements
- `test/` - Test additions

### 2. Make Your Changes

```bash
# Edit files in src/
vim src/js/recipeSearch.mjs
vim src/css/style.css
# etc.

# Keep changes small and focused
# (one feature per branch)
```

### 3. Test Your Changes

```bash
# Run linter
npm run lint

# Run tests
npm run test

# Build for production
npm run build

# Preview production build
npm run preview

# Test in browser
npm start
# Open http://localhost:5173
# Test all features related to your change
```

### 4. Commit Your Changes

```bash
# Stage changes
git add src/js/recipeSearch.mjs

# Commit with clear message
git commit -m "feat: add ingredient autocomplete to search

- Fetch ingredient list from API on focus
- Filter using fuzzy matching
- Display up to 10 suggestions
- Close dropdown on selection

Closes #42"
```

**Commit message format:**
```
<type>: <subject>

<body>

<footer>
```

**Type:** feat, fix, docs, style, refactor, test, chore  
**Subject:** 50 chars max, imperative mood, no period  
**Body:** Explain what and why (wrap at 72 chars)  
**Footer:** Reference issues: Closes #42, Fixes #43

### 5. Push to Your Fork

```bash
git push origin feature/ingredient-autocomplete
```

### 6. Create a Pull Request

1. Go to https://github.com/YOUR-USERNAME/pantry-chef
2. Click "Compare & pull request" (appears after push)
3. Fill in PR template:

```markdown
## Description
Brief explanation of changes

## Type of Change
- [ ] Bug fix
- [x] New feature
- [ ] Documentation
- [ ] Refactoring

## How to Test
1. Navigate to search page
2. Click in ingredient field
3. Type "tomato"
4. See autocomplete suggestions

## Screenshots
[If applicable]

## Checklist
- [x] Code follows style guidelines
- [x] Tests pass (npm run test)
- [x] Lint passes (npm run lint)
- [x] Build succeeds (npm run build)
- [x] No console errors
- [x] Responsive on mobile (375px) and desktop (1024px)
- [x] Documentation updated
```

4. Submit the PR

---

## Code Style Guidelines

### JavaScript

```javascript
// ✅ Good - Clear variable names
const fetchRecipes = async (ingredients) => {
  const response = await fetch(`/api/recipes?ingredients=${ingredients}`);
  return response.json();
};

// ❌ Bad - Unclear variable names
const f = async (i) => {
  const r = await fetch(`/api/recipes?ingredients=${i}&foo=bar`);
  return r.json();
};
```

**Guidelines:**
- Use `const` by default, `let` if reassignment needed
- Use arrow functions for callbacks
- Use async/await instead of .then()
- Add JSDoc comments for functions:

```javascript
/**
 * Fetch recipes by ingredients
 * @param {string[]} ingredients - List of ingredients
 * @returns {Promise<Object[]>} Array of recipe objects
 */
const fetchRecipes = async (ingredients) => {
  // ...
};
```

### CSS

```css
/* ✅ Good - Semantic class names */
.recipe-card {
  padding: 1rem;
  border-radius: var(--radius);
}

/* ❌ Bad - Generic class names */
.container {
  p: 10px;
  br: 5px;
}
```

**Guidelines:**
- Use CSS variables for colors/spacing
- Follow BEM naming (Block__Element--Modifier)
- Use semantic selectors
- Add comments for non-obvious styles:

```css
/* Prevent text selection on recipe detail buttons */
.recipe-actions button {
  user-select: none;
}
```

### HTML

```html
<!-- ✅ Good - Semantic, accessible -->
<article class="recipe-card">
  <h2>Jollof Rice</h2>
  <p>Nigerian rice dish</p>
  <button aria-label="Save to favorites">❤️</button>
</article>

<!-- ❌ Bad - Generic divs, no accessibility -->
<div class="card">
  <div>Jollof Rice</div>
  <div>Nigerian rice dish</div>
  <div onclick="save()">❤️</div>
</div>
```

**Guidelines:**
- Use semantic tags (`<article>`, `<nav>`, `<main>`, etc.)
- Add ARIA labels for icon buttons
- Keep HTML clean (no inline styles)
- Remove unused classes

### Run Linter

```bash
npm run lint     # Check code style
npm run lint:fix # Auto-fix style issues
```

---

## Testing Guidelines

### Unit Tests

Add tests for new utility functions:

```javascript
// src/js/__tests__/measurementConverter.test.js
describe('convertMeasurement', () => {
  it('should convert cups to grams', () => {
    const result = convertMeasurement(2, 'cups', 'grams');
    expect(result).toBeCloseTo(474, 0);
  });
});
```

### Manual Testing

Before submitting PR, test:

**Mobile (375px):**
```
[ ] Opens correctly
[ ] Buttons clickable
[ ] Text readable
[ ] No overlaps
[ ] All features work
```

**Tablet (768px):**
```
[ ] Layout responsive
[ ] Spacing good
[ ] Images load
[ ] No console errors
```

**Desktop (1024px+):**
```
[ ] 3-column layout visible
[ ] Sidebars present
[ ] Modal works
[ ] All buttons functional
[ ] No console errors
```

### Run All Tests

```bash
npm run lint     # Linter
npm run test     # Jest tests
npm run build    # Production build
npm run preview  # Test live
```

All must pass before PR submission.

---

## Documentation

### Update Docs When:

1. Adding a new feature → Update FEATURES.md
2. Changing API integration → Update SETUP.md
3. Changing deployment → Update DEPLOYMENT.md
4. Adding new module → Update README.md section
5. Adding testing procedure → Update TESTING.md

### Documentation Format

```markdown
# Section Title

Brief description of what this covers.

## Subsection

More detailed explanation.

### Code Example

\`\`\`javascript
const example = () => {
  // Clear, working code
};
\`\`\`

### Troubleshooting

**Problem:** Feature not working  
**Solution:** Step 1, Step 2, Step 3

## Next Steps

What users should do next.
```

---

## Common Contributions

### Bug Fixes

1. Describe the bug in issue format
2. Include: expected behavior, actual behavior, steps to reproduce
3. Create branch: `git checkout -b fix/search-button-disabled`
4. Fix the issue and test thoroughly
5. Submit PR with clear description

### New Features

1. Discuss in issues first (avoid work on duplicate features)
2. Create branch: `git checkout -b feature/measurement-converter`
3. Implement with tests
4. Update documentation
5. Submit PR with usage examples

### Documentation

1. Identify gap in docs
2. Create branch: `git checkout -b docs/add-api-guide`
3. Write clear, concise documentation
4. Include examples and screenshots
5. Submit PR for review

### Performance

1. Identify slow area (use DevTools)
2. Create branch: `git checkout -b perf/optimize-recipe-search`
3. Implement optimization
4. Measure improvement (before/after)
5. Submit PR with metrics

---

## Pull Request Review Process

### What to Expect

1. **Automated checks** (2-5 mins)
   - Linter passes
   - Tests pass
   - Build succeeds
   
2. **Code review** (24 hrs)
   - Maintainer reviews code
   - May request changes
   - Provide constructive feedback

3. **Approval** (24-48 hrs)
   - Green light to merge
   - Maintainer merges to main
   - Deployed in next release

### If Changes Requested

```bash
# Make requested changes
# Edit files
git add .
git commit -m "refactor: simplify search algorithm

Address review feedback"

# Push update (same branch)
git push origin feature/ingredient-autocomplete
```

---

## Merge Conflicts

If main branch changes while you work:

```bash
# Update your local main
git fetch upstream
git rebase upstream/main

# or if rebase fails
git rebase --abort
git merge upstream/main

# Resolve conflicts in editor
# Then:
git add .
git rebase --continue

# Force push to your fork
git push -f origin feature/your-feature
```

---

## Useful Commands

```bash
# Sync fork with upstream
git fetch upstream
git checkout main
git merge upstream/main
git push origin main

# See branches
git branch -a

# See commits
git log --oneline -10

# Undo last commit (unpushed)
git reset --soft HEAD~1

# Discard changes to file
git checkout -- src/js/search.js

# List files changed
git diff --name-only

# See detailed changes
git diff src/js/apiService.mjs
```

---

## Areas We Need Help

### High Priority
- [ ] Search performance optimization
- [ ] Mobile dark mode improvements
- [ ] API error handling improvements
- [ ] Recipe filtering (vegetarian, vegan, etc.)

### Medium Priority
- [ ] More Nigerian recipes/tips
- [ ] Testing improvements
- [ ] Performance metrics
- [ ] Accessibility enhancements

### Low Priority
- [ ] UI/UX polish
- [ ] Documentation improvements
- [ ] Code cleanup/refactoring
- [ ] Browser compatibility testing

---

## Recognition

We recognize all contributors:

- **Code contributions** → Mentioned in release notes
- **Bug reports** → Credited in issues
- **Documentation** → Listed in docs
- **Regular contributors** → Added to CONTRIBUTORS.md

---

## Questions or Issues?

- **Bug report:** Open issue with [BUG] tag
- **Feature request:** Open issue with [FEATURE] tag
- **Question:** Open issue with [QUESTION] tag
- **Discussion:** Use GitHub Discussions

---

## Maintainer Contacts

- **Repo Owner:** S-A-oghene
- **Issues:** https://github.com/S-A-oghene/pantry-chef/issues
- **Pull Requests:** https://github.com/S-A-oghene/pantry-chef/pulls

---

## Resources

- **Vite Documentation:** https://vitejs.dev/
- **JavaScript Guide:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
- **CSS Reference:** https://developer.mozilla.org/en-US/docs/Web/CSS
- **Jest Documentation:** https://jestjs.io/
- **Git Guide:** https://git-scm.com/doc
- **GitHub Guides:** https://guides.github.com/

---

## Thank You! 🎉

Thank you for contributing to Pantry Chef! Your work helps make cooking more enjoyable for everyone.

Happy coding! 🚀

---

*Last Updated: February 17, 2026*  
*Questions? Open an issue on GitHub!*
