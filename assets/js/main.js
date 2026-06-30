// ==========================================================================
// Tutory English — Shared JS
// ==========================================================================

document.addEventListener("DOMContentLoaded", function () {

  // ---- Mobile nav toggle ----
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
      });
    });
  }

  // ---- FAQ accordion ----
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  // ---- Testimonials parallax (rows shift vertically on scroll) ----
  var testiSection = document.querySelector(".testi-section");
  if (testiSection) {
    var testiTracks = testiSection.querySelectorAll(".testi-track");
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) {
      var onTestiScroll = function () {
        var rect = testiSection.getBoundingClientRect();
        var vh = window.innerHeight || document.documentElement.clientHeight;
        var progress = (rect.top - vh * 0.5) / (vh * 0.5 + rect.height * 0.5);
        progress = Math.max(-1, Math.min(1, progress));
        testiTracks.forEach(function (track, i) {
          var speed = i % 2 === 0 ? 24 : -32;
          track.style.transform = "translateY(" + (progress * speed) + "px)";
        });
      };
      window.addEventListener("scroll", onTestiScroll, { passive: true });
      window.addEventListener("resize", onTestiScroll);
      onTestiScroll();
    }
  }

  // ---- Pricing tabs (programs page) ----
  document.querySelectorAll(".tab-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = btn.getAttribute("data-tab");
      document.querySelectorAll(".tab-btn").forEach(function (b) { b.classList.remove("active"); });
      document.querySelectorAll(".tab-panel").forEach(function (p) { p.classList.remove("active"); });
      btn.classList.add("active");
      var panel = document.getElementById(target);
      if (panel) panel.classList.add("active");
    });
  });

  // ---- WhatsApp prefilled contact form ----
  var waForm = document.getElementById("waContactForm");
  if (waForm) {
    waForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = waForm.querySelector("#cf-name") ? waForm.querySelector("#cf-name").value : "";
      var program = waForm.querySelector("#cf-program") ? waForm.querySelector("#cf-program").value : "";
      var message = waForm.querySelector("#cf-message") ? waForm.querySelector("#cf-message").value : "";

      var text = "Halo Tutory English, perkenalkan saya " + name + ".";
      if (program) text += " Saya tertarik dengan program: " + program + ".";
      if (message) text += " " + message;

      var url = "https://wa.me/6287762013051?text=" + encodeURIComponent(text);
      window.open(url, "_blank");
    });
  }

  // ---- Footer year ----
  document.querySelectorAll(".js-year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---- Scrollspy: highlight active nav link based on section in view ----
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll(".nav-links a[href^='#']"));
  var sections = navAnchors
    .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navAnchors.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

});
