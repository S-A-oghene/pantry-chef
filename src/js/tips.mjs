export function initTips() {
  // Static tips already in HTML; nothing needed.

  // Back button (if on detail view)
  document
    .querySelector(".back-btn")
    ?.addEventListener("click", () => {
      window.history.back();
    });
}
