'use strict';

// =============================================
// PAGE LOADING SYSTEM
// Fetches page partials and injects into articles
// =============================================
const pageCache = {};

async function loadPage(pageName) {
  const article = document.querySelector('[data-page="' + pageName + '"]');
  if (!article || pageCache[pageName]) return;

  try {
    const resp = await fetch('./pages/' + pageName + '.html');
    if (!resp.ok) throw new Error('Failed to load ' + pageName);
    article.innerHTML = await resp.text();
    pageCache[pageName] = true;

    // Initialize page-specific features after content is loaded
    if (pageName === 'about' && typeof initCounters === 'function') initCounters();
    if (pageName === 'resume' && typeof initCertCarousel === 'function') initCertCarousel();
  } catch (e) {
    console.error('Page load error:', e);
    article.innerHTML = '<p class="text-red-500 p-8">Failed to load page content.</p>';
  }
}

// Load the default active page on startup
loadPage('about');


// =============================================
// SIDEBAR TOGGLE (shell element — always in DOM)
// =============================================
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });
}


// =============================================
// PAGE NAVIGATION (shell elements — always in DOM)
// =============================================
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.innerHTML.trim().toLowerCase();

    for (let j = 0; j < pages.length; j++) {
      if (targetPage === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }

    // Lazily load page content
    loadPage(targetPage);
  });
}


// =============================================
// EVENT-DELEGATED HANDLERS
// All use document-level delegation to work with
// dynamically loaded page content
// =============================================

// --- Testimonials Modal (About page) ---
document.addEventListener("click", function (e) {
  var item = e.target.closest("[data-testimonials-item]");
  if (item) {
    var container = document.querySelector("[data-modal-container]");
    var ov = document.querySelector("[data-overlay]");
    var mTitle = document.querySelector("[data-modal-title]");
    var mText = document.querySelector("[data-modal-text]");
    if (!container || !mTitle || !mText) return;

    var title = item.querySelector("[data-testimonials-title]");
    var text = item.querySelector("[data-testimonials-text]");
    if (title) mTitle.innerHTML = title.innerHTML;
    if (text) mText.innerHTML = text.innerHTML;

    container.classList.add("active");
    if (ov) ov.classList.add("active");
    var sec = container.querySelector("section");
    if (sec) sec.classList.add("active");
    return;
  }

  // Close testimonials modal
  if (e.target.closest("[data-modal-close-btn]") || e.target.matches("[data-overlay]")) {
    var container = document.querySelector("[data-modal-container]");
    var ov = document.querySelector("[data-overlay]");
    if (!container) return;
    container.classList.remove("active");
    if (ov) ov.classList.remove("active");
    var sec = container.querySelector("section");
    if (sec) sec.classList.remove("active");
  }
});


// --- Custom Select Dropdown (Portfolio mobile) ---
document.addEventListener("click", function (e) {
  var selectBtn = e.target.closest("[data-select]");
  if (selectBtn) {
    var list = selectBtn.parentElement.querySelector("[data-select-list]");
    if (list) list.classList.toggle("active");
    return;
  }

  var selectItem = e.target.closest("[data-select-item]");
  if (selectItem) {
    var value = selectItem.textContent.trim();
    var parent = selectItem.closest(".relative");
    var display = parent ? parent.querySelector("[data-selecct-value]") : null;
    var list = parent ? parent.querySelector("[data-select-list]") : null;
    if (display) display.textContent = value;
    if (list) list.classList.remove("active");
    filterPortfolio(value);
  }
});


// --- Portfolio Filter Buttons (desktop) ---
document.addEventListener("click", function (e) {
  var btn = e.target.closest("[data-filter-btn]");
  if (!btn) return;
  var value = btn.textContent.trim();

  document.querySelectorAll("[data-filter-btn]").forEach(function (b) {
    b.classList.remove("active");
  });
  btn.classList.add("active");
  filterPortfolio(value);
});

function filterPortfolio(category) {
  var items = document.querySelectorAll("[data-filter-item]");
  var cat = category.toLowerCase();
  items.forEach(function (item) {
    if (cat === "all" || item.dataset.category === cat) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}


// --- Project Modal (Portfolio page) ---
document.addEventListener("click", function (e) {
  var card = e.target.closest("[data-project-card]");
  if (card) {
    e.preventDefault();
    openProjectModal(card);
    return;
  }
  if (e.target.id === "projectOverlay" || e.target.closest("#projectModalClose")) {
    closeProjectModal();
  }
});

document.addEventListener("keydown", function (e) {
  var modal = document.getElementById("projectModal");
  if (e.key === "Escape" && modal && modal.classList.contains("active")) {
    closeProjectModal();
  }
});

function openProjectModal(card) {
  var modal = document.getElementById("projectModal");
  var overlay = document.getElementById("projectOverlay");
  if (!modal) return;

  document.getElementById("projectModalTitle").textContent = card.dataset.projectTitle || "";
  document.getElementById("projectModalCategory").textContent = card.dataset.projectCategory || "";
  document.getElementById("projectModalIndustry").textContent = card.dataset.projectIndustry || "";
  document.getElementById("projectModalDesc").innerHTML = "<p>" + (card.dataset.projectDesc || "") + "</p>";

  var icon = document.getElementById("projectModalIcon");
  if (icon) icon.setAttribute("name", card.dataset.projectIcon || "code-working-outline");

  var techContainer = document.getElementById("projectModalTech");
  if (techContainer) {
    var techs = (card.dataset.projectTech || "").split(",").filter(Boolean);
    techContainer.innerHTML = techs.map(function (t) {
      return '<span class="px-3 py-1.5 bg-brand-light text-brand text-xs font-semibold rounded-lg">' + t.trim() + '</span>';
    }).join("");
  }

  modal.classList.add("active");
  if (overlay) overlay.classList.add("active");
  var sec = modal.querySelector("section");
  if (sec) sec.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  var modal = document.getElementById("projectModal");
  var overlay = document.getElementById("projectOverlay");
  if (!modal) return;

  var sec = modal.querySelector("section");
  if (sec) sec.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
  setTimeout(function () {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }, 300);
}


// --- Gallery Filter ---
document.addEventListener("click", function (e) {
  var btn = e.target.closest("[data-gallery-filter]");
  if (!btn) return;

  var filter = btn.dataset.galleryFilter;
  document.querySelectorAll("[data-gallery-filter]").forEach(function (b) {
    b.classList.remove("bg-brand", "text-white");
    b.classList.add("bg-slate-100", "text-slate-600");
  });
  btn.classList.remove("bg-slate-100", "text-slate-600");
  btn.classList.add("bg-brand", "text-white");

  document.querySelectorAll("[data-gallery-category]").forEach(function (item) {
    item.style.display = (filter === "all" || item.dataset.galleryCategory === filter) ? "" : "none";
  });
});


// =============================================
// THEME TOGGLE — Light / Dark
// Persists choice in localStorage
// =============================================
(function () {
  var toggle = document.getElementById("themeToggle");
  var icon = document.getElementById("themeIcon");
  if (!toggle || !icon) return;

  // Apply saved theme on load
  var saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.setAttribute("data-theme", "dark");
    icon.setAttribute("name", "sunny-outline");
  }

  toggle.addEventListener("click", function () {
    var isDark = document.body.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.body.removeAttribute("data-theme");
      icon.setAttribute("name", "moon-outline");
      localStorage.setItem("theme", "light");
    } else {
      document.body.setAttribute("data-theme", "dark");
      icon.setAttribute("name", "sunny-outline");
      localStorage.setItem("theme", "dark");
    }
  });
})();