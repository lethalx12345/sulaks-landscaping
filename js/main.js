(function () {
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

  /* Lightbox gallery */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lb-img");
  var lbCaption = document.getElementById("lb-caption");
  var lbClose = document.getElementById("lb-close");
  var lastFocus = null;

  function openLb(btn) {
    var thumb = btn.querySelector("img");
    lastFocus = btn;
    lbImg.src = btn.getAttribute("data-full");
    lbImg.alt = thumb ? thumb.alt : "";
    lbCaption.textContent = btn.getAttribute("data-caption") || "";
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lbClose.focus();
  }

  function closeLb() {
    lb.hidden = true;
    lbImg.src = "";
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  if (lb) {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest(".shot-btn") : null;
      if (btn) {
        openLb(btn);
        return;
      }
      if (e.target === lb || e.target.closest("#lb-close")) closeLb();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lb.hidden) closeLb();
    });
  }

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
    if (!phone && !message) {
      return fail("Add a phone number or a short description of the project so we can reply.");
    }
    if (!service) return fail("Please choose the type of project.");

    var body = [
      "New project request from the website",
      "",
      "Name: " + name,
      "Phone: " + (phone || "not provided"),
      "Email: " + (form.email.value.trim() || "not provided"),
      "Service: " + service,
      "Project details: " + (message || "not provided")
    ].join("\n");

    var mailto = "mailto:info@sulakslandscaping.com?subject=" +
      encodeURIComponent("Quote request - " + name) +
      "&body=" + encodeURIComponent(body);

    window.location.href = mailto;

    status.className = "form-status ok";
    status.textContent =
      "Your email app is opening with the project details filled in. If it doesn't open, call us directly at (269) 462-1598.";
  });
})();
