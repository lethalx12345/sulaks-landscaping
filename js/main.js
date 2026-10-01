(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("nav");

  function setNav(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "✕" : "☰";
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(!nav.classList.contains("open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        setNav(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Photo lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lb-img");
  var lbCaption = document.getElementById("lb-caption");
  var lbClose = document.getElementById("lb-close");
  var lbPrev = document.getElementById("lb-prev");
  var lbNext = document.getElementById("lb-next");
  var lbCounter = document.getElementById("lb-counter");
  var shots = [].slice.call(document.querySelectorAll(".shot-btn"));
  var current = -1;
  var lastFocus = null;

  function show(index) {
    if (!shots.length) return;
    current = (index + shots.length) % shots.length;
    var btn = shots[current];
    var thumb = btn.querySelector("img");
    var figcap = btn.parentElement.querySelector("figcaption");

    lbImg.src = btn.getAttribute("data-full");
    lbImg.alt = thumb ? thumb.alt : "";
    lbCaption.textContent = btn.getAttribute("data-caption") || "";
    if (lbCounter) {
      lbCounter.textContent = "Photo " + (current + 1) + " of " + shots.length +
        (figcap ? " — " + figcap.textContent : "");
    }
  }

  function openLb(btn) {
    lastFocus = btn;
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    // Hide the page chrome so the hamburger can't collide with the close button.
    document.body.classList.add("lb-open");
    show(shots.indexOf(btn));
    lbClose.focus();
  }

  function closeLb() {
    lb.hidden = true;
    lbImg.src = "";
    document.body.style.overflow = "";
    document.body.classList.remove("lb-open");
    if (lastFocus) lastFocus.focus();
  }

  if (lb && shots.length) {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest(".shot-btn") : null;
      if (btn) {
        openLb(btn);
        return;
      }
      if (e.target === lb || e.target.closest("#lb-close")) closeLb();
    });

    lbNext.addEventListener("click", function () { show(current + 1); });
    lbPrev.addEventListener("click", function () { show(current - 1); });

    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;

      if (e.key === "Escape") { closeLb(); return; }
      if (e.key === "ArrowRight") { show(current + 1); return; }
      if (e.key === "ArrowLeft") { show(current - 1); return; }

      // Keep Tab inside the dialog while it is open.
      if (e.key === "Tab") {
        var focusables = [lbClose, lbPrev, lbNext];
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // Swipe between photos on touch devices.
    var touchX = null;
    lb.addEventListener("touchstart", function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var delta = e.changedTouches[0].clientX - touchX;
      if (Math.abs(delta) > 50) show(current + (delta < 0 ? 1 : -1));
      touchX = null;
    }, { passive: true });
  }

  /* ---------- Quote form ---------- */
  var form = document.getElementById("quote-form");
  var status = document.getElementById("form-status");

  if (!form || !status) return;

  function fail(msg) {
    status.className = "form-status err";
    status.textContent = msg;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = form.name.value.trim();
    var phone = form.phone.value.trim();
    var service = form.service.value;
    var message = form.message.value.trim();

    if (!name) return fail("Please enter your name.");
    if (!service) return fail("Please choose the type of project.");
    if (!phone && !message) {
      return fail("Add a phone number or a short description of the project so we can reply.");
    }

    var body = [
      "New project request from the website",
      "",
      "Name: " + name,
      "Phone: " + (phone || "not provided"),
      "Email: " + (form.email.value.trim() || "not provided"),
      "Service: " + service,
      "Project details: " + (message || "not provided")
    ].join("\n");

    window.location.href = "mailto:info@sulakslandscaping.com?subject=" +
      encodeURIComponent("Quote request - " + name) +
      "&body=" + encodeURIComponent(body);

    status.className = "form-status ok";
    status.textContent =
      "Your email app is opening with the project details filled in. If it doesn't open, call us directly at (269) 462-1598.";
  });
})();