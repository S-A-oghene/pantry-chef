# Deployment Guide

## Overview

Pantry Chef is deployed to **GitHub Pages** with automated CI/CD via **GitHub Actions**. Every push to the `main` branch automatically builds, tests, and deploys the application.

**Live Site:** https://S-A-oghene.github.io/pantry-chef/

---

## Table of Contents

- [How It Works](#how-it-works)
- [GitHub Pages Configuration](#github-pages-configuration)
- [GitHub Actions Workflow](#github-actions-workflow)
- [Deployment Process](#deployment-process)
- [Verify Deployment](#verify-deployment)
- [Troubleshooting](#troubleshooting)

---

## How It Works

1. **Push to main:** You push code to `origin/main`
2. **GitHub detects:** GitHub automatically triggers the workflow
3. **CI Pipeline:** 
   - Install dependencies
   - Run ESLint (code quality)
   - Run Jest (tests)
   - Build with Vite
4. **Deploy:** Built `dist/` folder deployed to GitHub Pages
5. **Live:** Site updates at https://S-A-oghene.github.io/pantry-chef/ (within 1-2 minutes)

---

## GitHub Pages Configuration

### Repository Settings

Located at: `https://github.com/S-A-oghene/pantry-chef/settings/pages`

**Current Configuration:**
- **Source:** GitHub Actions
- **Branch:** (auto-configured)
- **Folder:** (auto-configured)

**To Configure Manually:**
1. Go to repository Settings > Pages
2. Under "Build and deployment"
3. Select "GitHub Actions" as source
4. Save

---

## GitHub Actions Workflow

**Workflow File:** `.github/workflows/deploy.yml`

**What It Does:**
1. ✅ Runs on every push to `main` branch
2. ✅ Sets up Node.js 20
3. ✅ Installs dependencies (`npm ci`)
4. ✅ Checks code quality (`npm run lint`)
5. ✅ Runs tests (`npm run test`)
6. ✅ Builds project (`npm run build`)
7. ✅ Uploads `dist/` as artifact
8. ✅ Deploys to GitHub Pages

**Workflow Jobs:**
- `build:` Compiles code, runs checks, creates artifact
- `deploy:` Uploads artifact to GitHub Pages

---

## Deployment Process

### Automatic Deployment (Recommended)

**Step 1: Make Changes**
```bash
# Edit files locally
# Test changes: npm start
```

**Step 2: Commit Changes**
```bash
git add .
git commit -m "feat: Add new feature"
```

**Step 3: Push to GitHub**
```bash
git push origin main
```

**Step 4: Monitor Deployment**
- Go to: https://github.com/S-A-oghene/pantry-chef/actions
- Watch workflow execute (3-5 minutes)
- All steps should show ✅ green checkmarks

**Step 5: Verify Live Site**
- Visit: https://S-A-oghene.github.io/pantry-chef/
- Wait 1-2 minutes for update
- Refresh browser (Ctrl+Shift+R for hard refresh)

---

### Manual Deployment (If Needed)

If GitHub Actions fails, you can deploy manually:

**Local Build:**
```bash
npm run build
# Creates dist/ folder
```

**Push dist/ (Not Recommended)**
```bash
# Generally not needed since GitHub Actions handles it
# Only do this if workflow is broken
```

---

## Verify Deployment

### Check GitHub Actions Status

1. Go to: https://github.com/S-A-oghene/pantry-chef/actions
2. See recent workflow runs
3. Green checkmark (✅) = Success
4. Red X (❌) = Failed (check logs)

### Check Live Site

1. Visit: https://S-A-oghene.github.io/pantry-chef/
2. Press F12 (Open DevTools)
3. Console tab should show no errors
4. Network tab should show successful requests

### Check Specific Builds

Click on any workflow run to see:
- Build logs
- Test results
- Build artifacts
- Deployment status

---

## Troubleshooting

### Issue: 404 Not Found

**Symptom:** Live site shows "404 Not Found"

**Causes & Solutions:**
1. Site not deployed yet
   - Wait 2-3 minutes after push
   - Check GitHub Actions for build status
   
2. Base path incorrect
   - Check `vite.config.js`: should have `base: "/pantry-chef/"`
   - Rebuild: `npm run build`
   - Commit and push

3. Workflow failed
   - Check Actions tab for error logs
   - Look at failed job step
   - Common issue: missing npm dependencies
   - Solution: Delete node_modules, run `npm install`, push again

---

### Issue: Build Fails in GitHub Actions

**Check Logs:**
1. Go to Actions tab
2. Click failed workflow
3. Click failed job
4. Expand step to see error message

**Common Errors:**
```
Error: "npm WARN deprecated"
Solution: Usually just a warning, not blocking

Error: "ENOENT: no such file or directory"
Solution: Missing file in repo, check git status locally

Error: "ESLint errors"
Solution: Fix linting errors locally: npm run lint

Error: "Test failed"
Solution: Check test output, fix failing test
```

**Fix Locally & Resubmit:**
```bash
# Fix the error
# Test locally
npm run lint
npm run build
npm run test

# Commit and push again
git add .
git commit -m "fix: Resolve deployment issue"
git push origin main
```

---

### Issue: Site Looks Broken on GitHub Pages

**Causes:**
1. Asset paths incorrect (images, CSS not loading)
2. Browser cache outdated
3. Base path not configured

**Solutions:**
1. **Hard refresh browser:**
   ```
   Ctrl+Shift+R (Windows/Linux)
   Cmd+Shift+R (Mac)
   ```

2. **Clear browser cache:**
   - DevTools > Application > Cache > Clear all

3. **Check asset paths:**
   - Press F12 > Network tab
   - Look for 404 errors
   - Check DevTools Console for path issues

4. **Verify Vite config:**
   - Ensure `base: "/pantry-chef/"` in `vite.config.js`
   - Rebuild: `npm run build`

---

### Issue: Dark Mode Not Persisting

**Symptom:** Dark mode resets on page refresh

**Cause:** LocalStorage not working (unlikely on GitHub Pages)

**Solution:**
1. Check browser console for errors
2. Verify `localStorage` is enabled
3. Check Privacy/Incognito mode isn't blocking storage

---

### Issue: Slow Site Performance

**Cause:** Assets not cached properly

**Solution:**
1. GitHub Pages caches automatically
2. First load slower, subsequent fast
3. Check Network tab (F12) for CDN caching headers

---

## URL Structure

| Page | URL |
|------|-----|
| Home | https://S-A-oghene.github.io/pantry-chef/ |
| Search | https://S-A-oghene.github.io/pantry-chef/recipe/ |
| Recipe Detail | https://S-A-oghene.github.io/pantry-chef/recipe/detail.html?id=... |
| Favorites | https://S-A-oghene.github.io/pantry-chef/favorites/ |
| Tips | https://S-A-oghene.github.io/pantry-chef/tips/ |

---

## Rollback (If Needed)

If deployed code has issues:

```bash
# Find last good commit
git log --oneline -10

# Reset to previous commit
git reset --hard <commit-hash>

# Push to GitHub
git push origin main --force

# GitHub Actions will redeploy previous version
```

---

## Deployment Timeline

| Time | Status |
|------|--------|
| T+0min | Push to GitHub |
| T+0-1min | GitHub detects push |
| T+1-3min | Workflow running (lint, test, build) |
| T+3-5min | Deployment in progress |
| T+5-7min | Deploy completes |
| T+7-10min | Site updates (DNS refresh) |

Total time: **~10 minutes** from push to live update.

---

## GitHub Actions File

**Location:** `.github/workflows/deploy.yml`

**Key Points:**
- Runs on: `push` to `main` branch
- Node version: 20.x
- Permissions: `read`, `write` (pages)
- Artifacts: Uploaded before deploy
- Deploy: Auto-detected GitHub Pages environment

---

## Monitoring & Statistics

**Workflow Runs:** https://github.com/S-A-oghene/pantry-chef/actions

**View:**
- Total runs
- Success/failure rate
- Build duration
- Artifact sizes
- Deployment history

---

## Support

**If deployment issues persist:**

1. Check GitHub Actions logs carefully
2. Verify `vite.config.js` has `base: "/pantry-chef/"`
3. Ensure all dependencies resolve: `npm install`
4. Test locally: `npm start` and `npm run build`
5. Double-check API keys in `src/js/config.mjs`

---

**Last Updated:** February 17, 2026

For more information, see [README.md](README.md) or [SETUP.md](SETUP.md).
