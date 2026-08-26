const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

function setNavState() {
  nav.classList.toggle("scrolled", window.scrollY > 24);
}

function toggleMenu(forceOpen) {
  const open = typeof forceOpen === "boolean" ? forceOpen : !navLinks.classList.contains("open");
  navLinks.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
}

function setupReveal() {
  const revealItems = document.querySelectorAll("[data-reveal]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });

  revealItems.forEach((item) => observer.observe(item));
}

window.addEventListener("scroll", setNavState, { passive: true });
setNavState();
setupReveal();

burger.addEventListener("click", () => toggleMenu());

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => toggleMenu(false));
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
