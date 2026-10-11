const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", mobileMenu);
}

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  if (hamburger && navMenu) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
}

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  const theme = e.target.checked ? "dark" : "light";

  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }

  localStorage.setItem("theme", theme);
}

if (toggleSwitch) {
  toggleSwitch.addEventListener("change", switchTheme, false);
}

// Save user preference on load

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark" && toggleSwitch) {
    toggleSwitch.checked = true;
  }
}

// Contact form
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  const emailInput = contactForm.querySelector("#email");
  const submitButton = contactForm.querySelector(".contact-submit");
  const status = contactForm.querySelector(".contact-status");
  const defaultButtonContent = submitButton.innerHTML;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.className = "contact-status";
    status.textContent = "";
    emailInput.setCustomValidity("");

    if (emailInput.value.trim() && !emailPattern.test(emailInput.value.trim())) {
      emailInput.setCustomValidity("Please enter a valid email address.");
      emailInput.reportValidity();
      status.classList.add("is-error");
      status.textContent = "Please enter a valid email address.";
      return;
    }

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      status.classList.add("is-error");
      status.textContent = "Please complete all fields before submitting.";
      return;
    }

    submitButton.disabled = true;
    submitButton.classList.add("is-loading");
    submitButton.textContent = "Sending...";
    contactForm.setAttribute("aria-busy", "true");

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const providerError = result.errors?.map((error) => error.message).join(" ");
        throw new Error(providerError || result.error || "Form submission failed");
      }

      contactForm.reset();
      status.classList.add("is-success");
      status.textContent = "Thanks for reaching out. Your message has been sent.";
    } catch (error) {
      status.classList.add("is-error");
      status.textContent = error.message || "Something went wrong. Please try again or email me directly.";
    } finally {
      submitButton.disabled = false;
      submitButton.classList.remove("is-loading");
      submitButton.innerHTML = defaultButtonContent;
      contactForm.setAttribute("aria-busy", "false");
    }
  });
}

// Footer year

let myDate = document.querySelector("#datee");

const yes = new Date().getFullYear();
if (myDate) {
  myDate.innerHTML = yes;
}
