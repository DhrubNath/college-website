// Responsive navigation, dropdowns and accessibility font controls.
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("show");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  document.querySelectorAll(".nav-button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".nav-item");
      const isOpen = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  // Close dropdowns when clicking outside the navigation.
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".main-nav")) {
      document.querySelectorAll(".nav-item.open").forEach((item) => {
        item.classList.remove("open");
        item.querySelector(".nav-button")?.setAttribute("aria-expanded", "false");
      });
    }
  });

  // Font-size controls. The preference is stored only in this browser.
  let fontSize = 16;
  try {
    fontSize = Number(localStorage.getItem("np-font-size")) || 16;
  } catch (_) {}
  document.documentElement.style.setProperty("--site-font", `${fontSize}px`);

  document.querySelectorAll(".font-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.font;
      if (action === "up") fontSize = Math.min(22, fontSize + 2);
      if (action === "down") fontSize = Math.max(12, fontSize - 2);
      if (action === "reset") fontSize = 16;
      document.documentElement.style.setProperty("--site-font", `${fontSize}px`);
      try { localStorage.setItem("np-font-size", String(fontSize)); } catch (_) {}
    });
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  // Pause the moving notice ticker when the user hovers over it.
  const ticker = document.querySelector(".ticker-text");
  if (ticker) {
    ticker.addEventListener("mouseenter", () => ticker.style.animationPlayState = "paused");
    ticker.addEventListener("mouseleave", () => ticker.style.animationPlayState = "running");
  }
});
