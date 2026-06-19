/* =========================================================
   New Look Mowing & Landscaping — site interactions
   ========================================================= */
(function () {
  "use strict";

  var BUSINESS_PHONE = "+16468240022";       // tel:/sms: target
  var BUSINESS_EMAIL = "jaidevbector11@gmail.com";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile navigation ---------- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");

  function closeNav() {
    if (!nav) return;
    nav.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close when a nav link is tapped
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.getElementById("header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    // No IO support: just show everything
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Quote form ---------- */
  var form = document.getElementById("quote-form");
  var status = document.getElementById("form-status");

  function setStatus(msg, ok) {
    if (!status) return;
    status.hidden = false;
    status.textContent = msg;
    status.classList.remove("form-status--ok", "form-status--err");
    status.classList.add(ok ? "form-status--ok" : "form-status--err");
  }

  // Light-touch phone formatting as the user types: (646) 824-0022
  var phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      var d = phoneInput.value.replace(/\D/g, "").slice(0, 10);
      var out = d;
      if (d.length > 6) out = "(" + d.slice(0, 3) + ") " + d.slice(3, 6) + "-" + d.slice(6);
      else if (d.length > 3) out = "(" + d.slice(0, 3) + ") " + d.slice(3);
      else if (d.length > 0) out = "(" + d;
      phoneInput.value = out;
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Native validation
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var data = {
        name: (form.name && form.name.value || "").trim(),
        phone: (form.phone && form.phone.value || "").trim(),
        address: (form.address && form.address.value || "").trim(),
        service: (form.service && form.service.value || "").trim(),
        details: (form.details && form.details.value || "").trim()
      };

      var submitBtn = form.querySelector('button[type="submit"]');
      var action = form.getAttribute("action") || "";
      var configured = action && action.indexOf("your-form-id") === -1;

      // ---- Path A: a real form endpoint is configured (e.g. Formspree) ----
      if (configured) {
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }
        var payload = new FormData(form);
        payload.set("_subject", "New quote request – " + (data.service || "Landscaping") + " (" + data.name + ")");
        fetch(action, {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: payload
        }).then(function (res) {
          if (res.ok) {
            form.reset();
            setStatus("Thanks, " + (data.name || "there") + "! Your request was sent. We'll be in touch shortly. For the fastest response, call (646) 824-0022.", true);
          } else {
            throw new Error("Bad response");
          }
        }).catch(function () {
          fallbackSend(data);
        }).finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Get My Free Quote"; }
        });
        return;
      }

      // ---- Path B: no backend configured — never lose the lead ----
      fallbackSend(data);
    });
  }

  /* Build a pre-filled SMS (mobile) or email (desktop) so the lead always
     reaches the business even before a form backend is connected. */
  function fallbackSend(data) {
    var lines = [
      "New quote request from website:",
      "Name: " + data.name,
      "Phone: " + data.phone,
      "Address: " + data.address,
      "Service: " + data.service
    ];
    if (data.details) lines.push("Details: " + data.details);
    var body = lines.join("\n");

    var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      // Open the Messages app pre-filled to the business number
      var sep = /iPhone|iPad|iPod/i.test(navigator.userAgent) ? "&" : "?";
      window.location.href = "sms:" + BUSINESS_PHONE + sep + "body=" + encodeURIComponent(body);
      setStatus("Almost done! Your text message is ready — just hit send. Prefer to call? (646) 824-0022.", true);
    } else {
      var subject = "Quote request — " + (data.service || "Landscaping") + " (" + data.name + ")";
      window.location.href = "mailto:" + BUSINESS_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      setStatus("Almost done! Your email is ready to send in your mail app. Prefer to call? (646) 824-0022.", true);
    }
  }
})();
