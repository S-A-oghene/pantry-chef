export function openPantryModal() {
  const modal = document.getElementById("pantry-modal");
  if (modal) {
    modal.style.display = "flex";
    // Close on backdrop click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    // Close on cancel
    const cancelBtn = modal.querySelector(".btn-outline");
    if (cancelBtn) cancelBtn.addEventListener("click", closeModal);
  }
}

function closeModal() {
  const modal = document.getElementById("pantry-modal");
  if (modal) modal.style.display = "none";
}
