const container = document.querySelector(".cards-container");
const categoryListContainer = document.querySelector(".category-list");
let currentPage = 1;
const productsPerPage = 12;

async function fetchProducts(currentPage) {
  try {
    const skip = (currentPage - 1) * productsPerPage;
    const apiUrl = `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`;
    // if (search) {
    //   apiUrl = `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}&search=${search}`;
    // }
    const response = await fetch(apiUrl);
    const data = await response.json();
    const products = data.products;

    displayProducts(products);

    const totalPages = Math.ceil(data.total / productsPerPage);
    console.log(totalPages);
    createPaginationButtons(totalPages);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
function displayProducts(products) {
  container.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("cards");
    // add category name
    card.innerHTML = `
      <div class="image">
        <img src="${product.thumbnail}" alt="${product.title}" />
      </div>
      <div class="Name">
        <h1>${product.title}</h1>
        <a href="../category/category.html?category=${product.category}"><h2>${product.category}</h2></a>
        ${product.description}
        </div>
      <div class="price">
        <p>$${product.price}</p>
        <button  class="add-to-cart-btn" data-id="${product.id}">ADD TO CART</button>
      </div>
    `;
    container.appendChild(card);
  });

  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      console.log("Add to cart clicked for product ID:", productId);
      const selectedProduct = products.find(
        (product) => product.id == productId
      );
      console.log("Selected product:", selectedProduct);
      addToCart(selectedProduct);
      updateCartCount();
    });
  });
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  console.log("Cart before adding product:", cart, product);
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);
  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}
function createPaginationButtons(totalPages) {
  const paginationContainer = document.querySelector(".pagination-container");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i < 10 ? `0${i}` : i;
    if (i === currentPage) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      currentPage = i;
      document
        .querySelectorAll(".pagination-container button")
        .forEach((btn) => {
          btn.classList.remove("active");
        });
      button.classList.add("active");
      fetchProducts(currentPage);
    });

    paginationContainer.appendChild(button);
  }
}
fetchProducts(currentPage);

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
  // categoryListContainer.innerHTML = "";
  // categories.forEach((category) => {
  //   const card = document.createElement("li");
  //   card.innerHTML = `
  //     <a href="#" data-category="${category}">${category}</a>
  //   `;
  //   container.appendChild(card);
  // });
}

function updateCartCount() {
  const cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.querySelector(".cart-count");
  cartCount.innerText = cartProducts.length;
}

updateCartCount();

// fetchCategories();

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
    cartContainer.innerHTML = "<div>Your cart is empty.</div>";
    return;
  }

  cartProducts.forEach((product) => {
    // add category name
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
  // cartFooter.innerHTML = buttons;
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

// document.querySelectorAll(".category-list a").forEach((item) => {
//   item.addEventListener("click", function () {
//     var category = this.getAttribute("data-category");
//     window.location.href = `../category/category.html?category=${category}`;
//   });
// });
