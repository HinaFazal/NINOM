document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("homeLink").addEventListener("click", function () {
    document.querySelector(".header").scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("Aboutlink").addEventListener("click", function () {
    document.getElementById("Aboutlink").scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("Ourfruit").addEventListener("click", function () {
    document.getElementById("Ourfruit").scrollIntoView({ behavior: "smooth" });
  });

  document
    .getElementById("testimonialLink")
    .addEventListener("click", function () {
      document
        .getElementById("testimonialSection")
        .scrollIntoView({ behavior: "smooth" });
    });

  document.getElementById("contact us").addEventListener("click", function () {
    document
      .querySelector(".Contact-Us")
      .scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("login").addEventListener("click", function () {
    document.querySelector(".Login").scrollIntoView({ behavior: "smooth" });
  });
});

const sidebar = document.querySelector(".sidebar");
const cartIcon = document.querySelector(".fa-cart-shopping");
const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);

cartIcon.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("active"); // Show/hide the overlay
});

// Close the sidebar if the overlay is clicked
overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
});
