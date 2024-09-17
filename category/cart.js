const cart = JSON.parse(localStorage.getItem("cart")) || [];

console.log("cartt: ", cart);

const products = [
  { name: "Orange", price: 99.99, image: "/NINOM/images/f-1.jpg" },
  { name: "Grapes", price: 89.99, image: "/NINOM/images/f-2 (1).jpg" },
  { name: "Banana", price: 79.99, image: "/NINOM/images/f-3.jpg" },
  { name: "Apple", price: 69.99, image: "/NINOM/images/f-4.jpg" },
  { name: "Mango", price: 59.99, image: "/NINOM/images/f-5.jpg" },
  { name: "Strawberry", price: 49.99, image: "/NINOM/images/f-6.jpg" },
];

function loadCartItems() {
  const cartContainer = document.getElementById("cartItems");
  const cartFooter = document.getElementById("cartFooter");

  cartContainer.innerHTML = "";
  cartFooter.innerHTML = "";

  products.forEach((product) => {
    const card = `
        <div class="card-content">
          <img src="${product.image}" alt="${product.name}" class="product-image" />
          <div class="product-details">
            <h2 class="product-name">${product.name}</h2>
            <p class="product-price">$${product.price}</p>
          </div>
        </div>
      `;
    cartContainer.innerHTML += card;
  });

  const buttons = `
      <button class="add-to-cart-btn">CHECKOUT</button>
      <button class="view-details-btn">EDIT CART</button>
    `;
  cartFooter.innerHTML = buttons;
}

loadCartItems();
