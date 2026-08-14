/* =========================================================
   Title Simply NC — interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---- Sticky nav frosted state ---- */
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 12) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Pointer-follow glow + subtle 3D tilt on cards ---- */
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (fine && !reduce) {
    document.querySelectorAll(".card[data-tilt], .card.tilt").forEach(function (card) {
      var raf = null;
      function move(ev) {
        var r = card.getBoundingClientRect();
        var px = (ev.clientX - r.left) / r.width;
        var py = (ev.clientY - r.top) / r.height;
        card.style.setProperty("--mx", (px * 100) + "%");
        card.style.setProperty("--my", (py * 100) + "%");
        if (raf) return;
        raf = requestAnimationFrame(function () {
          var rx = (0.5 - py) * 6;
          var ry = (px - 0.5) * 6;
          card.style.transform =
            "translateY(-8px) perspective(900px) rotateX(" + rx.toFixed(2) +
            "deg) rotateY(" + ry.toFixed(2) + "deg)";
          raf = null;
        });
      }
      function leave() {
        if (raf) cancelAnimationFrame(raf), (raf = null);
        card.style.transform = "";
      }
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
    });

    /* Parallax drift for hero floating cards */
    var heroVisual = document.querySelector(".hero-visual");
    if (heroVisual) {
      var layers = heroVisual.querySelectorAll("[data-depth]");
      heroVisual.addEventListener("mousemove", function (ev) {
        var r = heroVisual.getBoundingClientRect();
        var cx = (ev.clientX - r.left) / r.width - 0.5;
        var cy = (ev.clientY - r.top) / r.height - 0.5;
        layers.forEach(function (l) {
          var d = parseFloat(l.getAttribute("data-depth")) || 0;
          l.style.transform = "translate(" + (cx * d * 26) + "px," + (cy * d * 26) + "px)";
        });
      });
      heroVisual.addEventListener("mouseleave", function () {
        layers.forEach(function (l) { l.style.transform = ""; });
      });
    }
  }

  /* ---- Count-up stats ---- */
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseFloat(el.getAttribute("data-count"));
        var suffix = el.getAttribute("data-suffix") || "";
        var dur = 1400, start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = target * eased;
          el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(0)) + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* ---- Order / contact form (preview stub) ----
     Not yet connected to a backend. Wire an endpoint below —
     Formspree, GoHighLevel, or a serverless handler — to go live. */
  var form = document.querySelector("[data-order-form]");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      // TODO: replace this block with a real submission, e.g.
      // fetch("https://formspree.io/f/XXXX", { method: "POST", body: new FormData(form) })
      var ok = form.querySelector(".form-ok");
      if (ok) {
        ok.classList.add("show");
        ok.textContent = "Thanks — this is a preview form. Connect an endpoint in assets/js/script.js to receive orders.";
      }
      form.querySelectorAll("input, select, textarea").forEach(function (f) {
        if (f.type !== "submit") f.value = "";
      });
    });
  }

  /* ---- Footer year ---- */
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
