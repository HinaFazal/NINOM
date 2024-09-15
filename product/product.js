const container = document.querySelector(".cards-container");
let currentPage = 1;
const productsPerPage = 10;

async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();
    const products = data.products;

    displayProducts(products, currentPage);

    const totalPages = Math.ceil(products.length / productsPerPage);
    createPaginationButtons(totalPages, products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
function displayProducts(products, page) {
  container.innerHTML = "";
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  paginatedProducts.forEach((product) => {
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
        <button>ADD TO CART</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function createPaginationButtons(totalPages, products) {
  const paginationContainer = document.querySelector(".pagination-container");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.addEventListener("click", () => {
      currentPage = i;
      displayProducts(products, currentPage);
    });
    paginationContainer.appendChild(button);
  }
}

fetchProducts();
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
