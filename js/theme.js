// js/theme.js
(function () {
  const KEY = "theme-mode"; // "auto" | "light" | "dark"
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  const html = document.documentElement;
  const mq = window.matchMedia("(prefers-color-scheme: dark)");

  function apply(mode) {
    html.classList.remove("light-mode", "dark-mode");
    if (mode === "light") {
      html.classList.add("light-mode");
      btn.textContent = "☀️";
      btn.title = "Theme: Light";
    } else if (mode === "dark") {
      html.classList.add("dark-mode");
      btn.textContent = "🌙";
      btn.title = "Theme: Dark";
    } else {
      // auto
      btn.textContent = "🌓";
      btn.title = "Theme: Auto (system)";
      // no class on <html>; CSS @media will apply
    }
  }

  // initial
  let mode = localStorage.getItem(KEY) || "auto";
  apply(mode);

  // react to OS theme changes while in Auto
  mq.addEventListener?.("change", () => {
    if ((localStorage.getItem(KEY) || "auto") === "auto") apply("auto");
  });

  btn.addEventListener("click", () => {
    mode = (mode === "light") ? "dark" : (mode === "dark") ? "auto" : "light";
    localStorage.setItem(KEY, mode);
    apply(mode);
  });
})();