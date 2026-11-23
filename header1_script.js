document.addEventListener("DOMContentLoaded", () => {
  const htmlRoot = document.documentElement;
  const decreaseBtn = document.getElementById("font-decrease");
  const resetBtn = document.getElementById("font-reset");
  const increaseBtn = document.getElementById("font-increase");

  // Default, minimum, and maximum root font sizes in pixels
  const DEFAULT_SIZE = 16;
  const MIN_SIZE = 12;
  const MAX_SIZE = 22;
  const STEP = 2;

  // Load saved preference if available
  let currentSize = parseInt(localStorage.getItem("preferredFontSize"), 10) || DEFAULT_SIZE;
  htmlRoot.style.fontSize = `${currentSize}px`;

  function updateFontSize(newSize) {
    currentSize = Math.min(MAX_SIZE, Math.max(MIN_SIZE, newSize));
    htmlRoot.style.fontSize = `${currentSize}px`;
    localStorage.setItem("preferredFontSize", currentSize);
  }

  decreaseBtn.addEventListener("click", () => {
    updateFontSize(currentSize - STEP);
  });

  resetBtn.addEventListener("click", () => {
    updateFontSize(DEFAULT_SIZE);
  });

  increaseBtn.addEventListener("click", () => {
    updateFontSize(currentSize + STEP);
  });
});