document.addEventListener("DOMContentLoaded", function () {
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

async function fetchCategories() {
  try {
    const response = await fetch(
      "https://dummyjson.com/products/category-list"
    );
    const categories = await response.json();
    displayCategories(categories);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function displayCategories(categories) {
  const categoryListContainer = document.querySelector(".category-list");

  console.log("displayCat: ", categories, categoryListContainer);
  categories.forEach(function (category) {
    var listItem = document.createElement("li");
    var link = document.createElement("a");
    link.href = "#";
    link.dataset.category = category;
    link.textContent = category;
    link.addEventListener("click", function () {
      window.location.href = `../category/category.html?category=${this.dataset.category}`;
    });

    listItem.appendChild(link);
    categoryListContainer.appendChild(listItem);
  });
}

function updateCartCount() {
  const cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.querySelector(".cart-count");
  cartCount.innerText = cartProducts.length;
}

updateCartCount();

const sidebar = document.querySelector(".sidebar");
const cartIcon = document.querySelector(".fa-cart-shopping");
const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);

cartIcon.addEventListener("click", () => {
  loadCartItems();
  sidebar.classList.toggle("open");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
});

function loadCartItems() {
  const cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cartItems");
  const cartFooter = document.getElementById("cartFooter");

  cartContainer.innerHTML = "";
  cartFooter.innerHTML = "";

  if (cartProducts.length === 0) {
    cartContainer.innerHTML = "<div class>Your cart is empty.</div>";
    return;
  }

  cartProducts.forEach((product) => {
    const card = `
        <div class="card-content">
          <img src="${product.images[0]}" alt="${product.title}" class="product-image" />
          <div class="product-details">
            <h2 class="product-name">${product.title}</h2>
            <p class="product-price">$${product.price}</p>          
          </div>
          <button class="remove-to-cart-btn" data-id="${product.id}">
          <i class="fa-solid fa-trash-can" id="deleteIcon"></i>
          </button>
        </div>
      `;
    cartContainer.innerHTML += card;
  });

  const removeFromCartButtons = document.querySelectorAll(
    ".remove-to-cart-btn"
  );
  removeFromCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.currentTarget.getAttribute("data-id");
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = cart.filter((product) => product.id != productId);
      updateCartCount();
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      loadCartItems();
    });
  });

  const buttons = `
      <button class="add-to-cart-btn">CHECKOUT</button>
      <button class="view-details-btn">EDIT CART</button>
    `;
}

loadCartItems();

var popup = document.getElementById("categoryPopup");
var btn = document.getElementById("categoryPopupButton");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  popup.style.display = "block";
  fetchCategories();
};

span.onclick = function () {
  popup.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
};
