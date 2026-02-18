/**
 * Navigation utilities for GitHub Pages subdirectory
 * Handles routing when app is deployed to a subdirectory (e.g., /pantry-chef/)
 */

const BASE_URL = import.meta.env.BASE_URL || "/";

/**
 * Get the full URL for a given path
 * @param {string} path - The relative path (e.g., '/', '/recipe/', '/favorites/')
 * @returns {string} The full URL accounting for BASE_URL
 */
export const getUrl = (path) => {
  if (BASE_URL === "/") {
    return path;
  }
  
  if (path === "/" || path === "") {
    return BASE_URL.slice(0, -1) || "/"; // Remove trailing slash for root
  }
  
  return BASE_URL + path.slice(1); // Remove leading slash, add after base
};

/**
 * Setup client-side navigation for all internal links
 * Intercepts link clicks and uses history.pushState instead of full page reload
 * @param {Function} routerFunc - The router function to call after state change
 */
export const setupNavigation = (routerFunc) => {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    
    if (!link) return;
    
    const href = link.getAttribute("href");
    
    // Only handle internal navigation links (starting with /)
    if (!href.startsWith("/")) return;
    
    // Don't handle links to external sites
    if (link.hostname && link.hostname !== window.location.hostname) return;
    
    // Build the target path accounting for BASE_URL
    let targetPath = href;
    const baseUrlPath = BASE_URL.slice(0, -1); // Remove trailing slash
    
    // If we're in a subdirectory, build proper path
    if (baseUrlPath) {
      // The href should already be wrapped, but ensure it has proper base
      if (!href.startsWith(baseUrlPath)) {
        targetPath = baseUrlPath + href;
      }
    }
    
    // Update browser history
    event.preventDefault();
    window.history.pushState({}, "", targetPath);
    
    // Call router immediately to update page
    routerFunc();
  });
};

/**
 * Update all internal links to account for BASE_URL
 * Useful for links that are hardcoded in HTML
 */
export const updateLinksForBaseUrl = () => {
  if (BASE_URL === "/") return; // No changes needed if at root
  
  document.querySelectorAll('a[href^="/"]').forEach((link) => {
    const href = link.getAttribute("href");
    if (href === "/") {
      link.setAttribute("href", BASE_URL.slice(0, -1) || "/");
    } else {
      link.setAttribute("href", BASE_URL + href.slice(1));
    }
  });
};
