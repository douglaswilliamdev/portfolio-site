// PEGAR AS FOTOS ORIGINAIS E TROCAR PARA AS COLORIDAS

document.querySelectorAll("img[data-hover]").forEach(img => {
  const original = img.src;
  const hover = img.getAttribute("data-hover");

  img.addEventListener("mouseenter", () => { img.src = hover; });
  img.addEventListener("mouseleave", () => { img.src = original; });
}); 

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".navbar nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("active");
});