(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function mode() {
    var t = root.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return media.matches ? "dark" : "light";
  }

  function sync(btn) {
    var m = mode();
    btn.setAttribute("data-mode", m);
    btn.setAttribute("aria-label", m === "dark" ? "Switch to light mode" : "Switch to dark mode");
    btn.setAttribute("title", m === "dark" ? "Light mode" : "Dark mode");
    document.dispatchEvent(new CustomEvent("themechange", { detail: m }));
  }

  document.addEventListener("DOMContentLoaded", function () {
    var wrap = document.querySelector(".nav-wrap");
    if (!wrap) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    btn.innerHTML =
      '<svg class="i-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path></svg>' +
      '<svg class="i-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>';
    wrap.insertBefore(btn, wrap.firstChild);
    btn.addEventListener("click", function () {
      var next = mode() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      sync(btn);
    });
    if (media.addEventListener) {
      media.addEventListener("change", function () {
        if (!root.getAttribute("data-theme")) sync(btn);
      });
    }
    sync(btn);
  });
})();
