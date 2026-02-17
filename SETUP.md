# Setup Guide

Complete step-by-step guide to install and run Pantry Chef locally.

---

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Installation](#installation)
3. [API Configuration](#api-configuration)
4. [Running the Application](#running-the-application)
5. [Troubleshooting](#troubleshooting)

---

## System Requirements

### Required
- **Node.js:** v18.0.0 or higher (v20.11.0 or later recommended)
- **npm:** v10.0.0 or higher
- **Git:** Latest version
- **Disk Space:** ~300MB (including node_modules)

### Recommended
- **Node.js:** v24.12.0 (current version used in project)
- **npm:** 11.10.0 (current version used in project)
- **OS:** Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **Browser:** Chrome, Firefox, Safari, or Edge (latest versions)

### Check Your Versions

```bash
node --version
# Should output: v18.0.0 or higher

npm --version
# Should output: 10.0.0 or higher

git --version
# Should output: git version 2.x.x or higher
```

---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/S-A-oghene/pantry-chef.git
cd pantry-chef
```

**What this does:**
- Downloads all project files from GitHub
- Creates `pantry-chef/` directory
- Sets up Git connection

**Expected output:**
```
Cloning into 'pantry-chef'...
remote: Enumerating objects: ...
...
```

---

### Step 2: Verify Project Structure

After cloning, verify the directory structure:

```bash
# List main directory
ls -la
# or on Windows PowerShell:
Get-ChildItem
```

**You should see:**
```
src/               (source code)
node_modules/      (after npm install)
vite.config.js     (Vite configuration)
package.json       (project configuration)
README.md          (documentation)
...
```

---

### Step 3: Install Dependencies

```bash
npm install
```

**What this does:**
- Reads `package.json`
- Downloads all required packages from npm registry
- Creates `node_modules/` directory (~200MB)
- Generates `package-lock.json` (locks specific versions)

**Duration:** 2-5 minutes (depends on internet speed)

**Expected output:**
```
npm notice created a lockfile as package-lock.json
added 450 packages (example count) in 2m 30s
```

**If it fails:**
```bash
# Clear npm cache and retry
npm cache clean --force
npm install
```

---

### Step 4: Create API Configuration File

```bash
# Copy template to create config file
cp src/js/config.template.mjs src/js/config.mjs
```

**What this does:**
- Creates `src/js/config.mjs` from template
- This file stores API keys

**File contents (template):**
```javascript
// Edamam API credentials
// Get free key from: https://developer.edamam.com/
export const API_ID = "your_edamam_id";
export const APP_KEY = "your_edamam_key";

// TheMealDB (no key needed, public API)
export const THEMEALDB_URL = "https://www.themealdb.com/api/json/v1/1";
```

---

## API Configuration

### Get Edamam API Keys

**Why?** Edamam provides nutritional data for recipes.

**Steps:**

1. **Visit Edamam Developer Portal**
   - Go to: https://developer.edamam.com/
   - Click "Sign Up"

2. **Create Account**
   - Email
   - Password
   - Agree to terms
   - Verify email

3. **Create Application**
   - Login to dashboard
   - Click "Applications"
   - Click "Create New Application"
   - Select "Recipe Search API"
   - Accept license terms
   - Click "Create Application"

4. **Get Credentials**
   - Copy "Application ID"
   - Copy "Application Keys"

5. **Add to Config File**
   - Open `src/js/config.mjs`
   - Replace placeholder values:
     ```javascript
     export const API_ID = "abc123def456ghi789";  // Your app ID
     export const APP_KEY = "xyz789abc456def123jkl";  // Your app key
     ```

6. **Save file**
   - Don't commit `config.mjs` to Git (security)
   - Add to `.gitignore` (should already be there)

**TheMealDB:** No API key needed (public API)

---

### Verify Configuration

```bash
# Check that config.mjs exists
test -f src/js/config.mjs && echo "Config file exists" || echo "Config file missing"

# Verify it's not in Git
cat .gitignore | grep "config.mjs"
# Should show: src/js/config.mjs
```

---

## Running the Application

### Development Server

```bash
npm start
```

**What this does:**
- Starts Vite development server
- Opens browser to http://localhost:5173 (automatic)
- Enables hot module replacement (code changes reflect instantly)
- Shows console logs and errors

**Expected output:**
```
  VITE v5.4.21  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

**Access the app:**
- Automatically opens browser
- Or manually: http://localhost:5173
- Use mobile view: F12 > Device Toggle (Ctrl+Shift+M)

**Stop the server:**
```bash
Ctrl+C (Windows/Linux/Mac)
```

---

### Production Build

```bash
npm run build
```

**What this does:**
- Optimizes code for production
- Minifies CSS and JavaScript
- Bundles assets
- Creates `dist/` directory

**Expected output:**
```
vite v5.4.21 building for production...
✓ 24 modules transformed.
...
✓ built in 312ms
```

**Output files in `dist/`:**
- HTML files
- CSS bundles
- JavaScript bundles
- Images (if any)

---

### Preview Production Build

```bash
npm run preview
```

**What this does:**
- Serves production build locally
- Helps debug production issues

**Access:**
```
http://localhost:4173
```

---

## Running Quality Checks

### Linting (Code Quality)

```bash
npm run lint
```

**What this does:**
- Checks code against ESLint rules
- Identifies code style issues
- Suggests improvements

**Expected output:**
```
✓ 0 problems
```

**If errors found:**
- Read error messages
- Fix code issues
- Run again to verify

---

### Running Tests

```bash
npm run test -- --watchAll=false
```

**What this does:**
- Runs Jest test suite
- Validates functionality

**Expected output:**
```
PASS  src/test/example.test.js
  ✓ example test (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
```

---

## Directory Structure

```
pantry-chef/
├── src/
│   ├── index.html              # Home page
│   ├── recipe/
│   │   ├── index.html          # Search page
│   │   └── detail.html         # Detail page
│   ├── favorites/index.html     # Favorites
│   ├── tips/index.html         # Tips page
│   ├── css/
│   │   └── style.css           # All styles
│   ├── js/                     # JavaScript modules
│   │   ├── main.mjs            # Entry point
│   │   ├── *.mjs               # Feature modules
│   │   └── config.mjs          # API config (create from template)
│   └── public/images/          # Images
├── test/
│   └── example.test.js         # Tests
├── dist/                       # Production build (created by build)
├── node_modules/               # Dependencies (created by npm install)
├── vite.config.js             # Vite config
├── eslint.config.js           # Linting rules
├── jest.config.js             # Testing config
├── package.json               # Project configuration
└── README.md                  # Documentation
```

---

## Troubleshooting

### Issue: "command not found: npm"

**Cause:** Node.js/npm not installed

**Solution:**
1. Download Node.js from nodejs.org
2. Install (includes npm)
3. Restart terminal
4. Verify: `npm --version`

---

### Issue: "EACCES: permission denied"

**Cause:** Permission issues on macOS/Linux

**Solution:**
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Try install again
npm install
```

---

### Issue: "Cannot find module" error

**Cause:** Dependencies not installed

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

### Issue: "config.mjs is missing"

**Cause:** API config file not created

**Solution:**
```bash
# Create from template
cp src/js/config.template.mjs src/js/config.mjs

# Add your API keys
# Edit: src/js/config.mjs
```

---

### Issue: "Port 5173 already in use"

**Cause:** Another app using the port

**Solution:**
```bash
# Kill process using port 5173
# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# On macOS/Linux:
lsof -i :5173
kill -9 <PID>

# Try again
npm start
```

---

### Issue: Development server won't start

**Cause:** Various (corrupted files, permission issues)

**Solution:**
```bash
# Clean install
rm -rf node_modules dist .env
npm install
npm start
```

---

### Issue: API calls failing (recipes not loading)

**Cause:** API keys incorrect or network issue

**Solution:**
1. Check `src/js/config.mjs` has correct keys
2. Verify internet connection
3. Check browser console (F12) for error messages
4. Try again (APIs sometimes rate-limited)

---

### Issue: Dark mode not persisting

**Cause:** Browser privacy settings or localStorage disabled

**Solution:**
1. Check browser privacy settings
2. Allow localStorage for localhost
3. Not an issue on production (HTTPS)
4. Try different browser

---

## Next Steps

After successful setup:

1. **Run development server:**
   ```bash
   npm start
   ```

2. **Explore the app:**
   - Click through pages
   - Test recipe search
   - Try dark mode
   - Add recipes to favorites

3. **Make changes:**
   - Edit files in `src/`
   - Changes auto-reload in browser

4. **Run quality checks:**
   ```bash
   npm run lint
   npm run test
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Deploy:**
   - Push to GitHub: `git push origin main`
   - GitHub Actions handles deployment
   - Live at: https://S-A-oghene.github.io/pantry-chef/

---

## Additional Resources

- [README.md](README.md) - Project overview
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [TESTING.md](TESTING.md) - Testing procedures
- [Vite Documentation](https://vitejs.dev/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [ESLint Rules](https://eslint.org/docs/rules/)

---

**Need help?** Check [README.md](README.md) or open an issue on GitHub.
