export function showSkeleton(container, count = 3) {
  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement("div");
    skeleton.className = "recipe-card skeleton";
    container.appendChild(skeleton);
  }
}

export function animateProgressBars() {
  document.querySelectorAll(".progress-fill").forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
}

export function loadDarkMode() {
  const saved = localStorage.getItem("darkMode") === "true";
  if (saved) document.body.classList.add("dark-mode");
  document.querySelectorAll(".dark-mode-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode")
      );
    });
  });
}
