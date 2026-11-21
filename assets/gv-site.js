/* Header interactions from the homepage component: desktop dropdown, mobile tray under 820px. */
(function () {
  var MQ = 820;
  var header = document.querySelector(".gv-header");
  var burger = document.querySelector(".gv-burger");
  var mobile = document.querySelector(".gv-mobile");
  var drop = document.querySelector(".gv-drop");
  var closeTimer;

  function isMobile() { return window.innerWidth < MQ; }

  function closeMenu() {
    if (mobile) mobile.classList.remove("open");
    if (burger) burger.setAttribute("aria-expanded", "false");
  }

  if (drop) {
    var open = function () { clearTimeout(closeTimer); drop.classList.add("open"); };
    var close = function () {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(function () { drop.classList.remove("open"); }, 300);
    };
    drop.addEventListener("mouseenter", open);
    drop.addEventListener("mouseleave", close);
    var btn = drop.querySelector(":scope > button");
    if (btn) btn.addEventListener("click", function (e) {
      e.preventDefault();
      clearTimeout(closeTimer);
      drop.classList.toggle("open");
    });
  }

  if (burger && mobile) {
    burger.addEventListener("click", function () {
      var open = !mobile.classList.contains("open");
      mobile.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var solToggle = document.querySelector(".gv-mobile-sol-toggle");
  var sol = document.querySelector(".gv-mobile-sol");
  if (solToggle && sol) {
    solToggle.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;
      sol.classList.toggle("open");
      var mark = solToggle.querySelector("[data-chevron]");
      if (mark) mark.textContent = sol.classList.contains("open") ? "−" : "+";
    });
  }

  document.querySelectorAll(".gv-mobile [data-close]").forEach(function (el) {
    el.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", function () {
    if (!isMobile()) closeMenu();
  });
})();
