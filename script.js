// Ryland's Mobile Detailing — interactions
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var center = document.querySelector(".nav-center");
  if (toggle && center) {
    toggle.addEventListener("click", function () {
      var open = center.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    center.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        center.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Booking confirmation (shown after Netlify Forms redirects back with ?booked=1)
  if (/[?&]booked=1/.test(window.location.search)) {
    var bform = document.querySelector(".book-form");
    if (bform) {
      var ok = document.createElement("div");
      ok.className = "book-success";
      ok.setAttribute("role", "status");
      ok.innerHTML = '<h3>Thanks — we got your request!</h3><p>We\'ll reach out shortly to confirm your detail. Need us fast? Call or text <a href="tel:+14077171124">407-717-1124</a>.</p>';
      bform.replaceWith(ok);
      var book = document.getElementById("book");
      if (book) book.scrollIntoView();
    }
  }

  // Header shadow on scroll
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.style.boxShadow = window.scrollY > 8 ? "0 10px 30px -18px rgba(0,0,0,0.9)" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Scroll reveal (progressive enhancement; respects reduced motion)
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    var els = document.querySelectorAll(".section-head, .svc-card, .why-card, .review-card, .area-copy, .area-list, .faq-item, .book-copy, .book-form, .addons, .trust-cell");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    var vh = window.innerHeight || document.documentElement.clientHeight;
    els.forEach(function (el) {
      if (el.getBoundingClientRect().top < vh * 0.92) return;
      el.classList.add("reveal");
      io.observe(el);
    });
  }
})();
