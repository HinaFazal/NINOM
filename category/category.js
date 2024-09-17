const container = document.querySelector(".cards-container");
const categoryHeading = document.querySelector(".category-heading");
let currentPage = 1;
const productsPerPage = 12;

async function fetchProducts(currentPage) {
  try {
    const urlParams = new URLSearchParams(window.location.search); //
    const category = urlParams.get("category") || "beauty"; //
    const skip = (currentPage - 1) * productsPerPage;
    const response = await fetch(`
      https://dummyjson.com/products/category/${category}?limit=${productsPerPage}&skip=${skip}`);
    // https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`);
    const data = await response.json();
    const products = data.products;

    console.log("Fetching products for page", categoryHeading);
    categoryHeading.innerText = category;
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
    card.innerHTML = `
      <div class="image">
        <img src="${product.thumbnail}" alt="${product.title}" />
      </div>
      <div class="Name">
        <h1>${product.title}</h1>
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

  console.log("Product added to cart:", product);
}
function createPaginationButtons(totalPages) {
  const paginationContainer = document.querySelector(".pagination-container");
  paginationContainer.innerHTML = "";
  if (totalPages === 1) {
    return;
  }

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
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
