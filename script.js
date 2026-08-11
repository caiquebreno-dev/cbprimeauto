/* =========================================
   CB PRIME AUTO — SCRIPT PRINCIPAL
   (sem carrinho — só vitrine de serviços)
========================================= */


// ---------- MENU MOBILE ----------
const hamburger  = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});

function closeMobileMenu() {
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
}

// ---------- SCROLL ----------
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// ---------- HEADER SCROLL ----------
window.addEventListener("scroll", () => {
  document.getElementById("header").classList.toggle("scrolled", window.scrollY > 50);
});

// ---------- REVEAL ----------
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ---------- TOAST ----------
function mostrarToast(msg, type) {
  const toast     = document.getElementById("toast");
  const toastMsg  = document.getElementById("toastMsg");
  const toastIcon = document.getElementById("toastIcon");

  toastMsg.textContent = msg;

  if (type === "add") {
    toastIcon.innerHTML   = '<i class="fa-solid fa-circle-check"></i>';
    toastIcon.style.color = "#4ade80";
  } else if (type === "warning") {
    toastIcon.innerHTML   = '<i class="fa-solid fa-triangle-exclamation"></i>';
    toastIcon.style.color = "#fbbf24";
  }

  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// ---------- INIT ----------
