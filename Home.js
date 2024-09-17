document.addEventListener("DOMContentLoaded", function () {
  // document.getElementById("home-link").addEventListener("click", function () {
  //   document.querySelector(".header").scrollIntoView({ behavior: "smooth" });
  // });

  document.getElementById("about-link").addEventListener("click", function () {
    document.querySelector(".about").scrollIntoView({ behavior: "smooth" });
  });

  document
    .getElementById("our-fruit-link")
    .addEventListener("click", function () {
      document
        .querySelector(".fruitshop")
        .scrollIntoView({ behavior: "smooth" });
    });

  document
    .getElementById("testimonial-link")
    .addEventListener("click", function () {
      document
        .getElementById("testimonialSection")
        .scrollIntoView({ behavior: "smooth" });
    });

  document.getElementById("contact-us").addEventListener("click", function () {
    document
      .querySelector(".contact-us")
      .scrollIntoView({ behavior: "smooth" });
  });
});

const sidebar = document.querySelector(".sidebar");
const cartIcon = document.querySelector(".fa-cart-shopping");
const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);

cartIcon.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
});
