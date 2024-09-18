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
