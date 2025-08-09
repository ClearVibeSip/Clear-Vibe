let slideIndex = 0;
const slides = document.getElementsByClassName("slide");

function showSlides() {
  for (let slide of slides) {
    slide.classList.remove("active");
  }
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].classList.add("active");
  setTimeout(showSlides, 4500);
}

window.onload = showSlides;

document.addEventListener("DOMContentLoaded", () => {
  const exploreBtn = document.getElementById("explore-btn");
  const dropdown = document.getElementById("explore-dropdown");

  exploreBtn.addEventListener("click", () => {
    const isExpanded = exploreBtn.getAttribute("aria-expanded") === "true";
    exploreBtn.setAttribute("aria-expanded", !isExpanded);
    dropdown.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (
      !exploreBtn.contains(e.target) &&
      !dropdown.contains(e.target)
    ) {
      dropdown.classList.remove("show");
      exploreBtn.setAttribute("aria-expanded", "false");
    }
  });
});
