// // Fetch products and create dynamic cards
// fetch("https://dummyjson.com/products")
//   .then((response) => response.json())
//   .then((data) => {
//     const cardsContainer = document.querySelector(".cards-container");
//     data.products.forEach((product) => {
//       const productCard = document.createElement("div");
//       productCard.className = "product-card";
//       productCard.setAttribute("data-id", product.id); // Set data-id attribute

//       productCard.innerHTML = `
//                 <img src="${product.thumbnail}" alt="${product.title}">
//                 <h2>${product.title}</h2>
//                 <p>${product.description}</p>
//                 <p>$${product.price}</p>
//             `;

//       // Add click event listener to navigate to product details page
//       productCard.addEventListener("click", function () {
//         window.location.href = `product.html?id=${product.id}`;
//       });

//       cardsContainer.appendChild(productCard);
//     });
//   })
//   .catch((error) => console.error("Error fetching products:", error));
// // Get product ID from URL
// const urlParams = new URLSearchParams(window.location.search);
// const productId = urlParams.get("id");

// // Fetch product details
// fetch(`https://dummyjson.com/products/${productId}`)
//   .then((response) => response.json())
//   .then((product) => {
//     // Dynamically create and append HTML elements for product details
//     const productContainer = document.querySelector(".product-container");

//     productContainer.innerHTML = `
//             <h1>${product.title}</h1>
//             <img src="${product.thumbnail}" alt="${product.title}">
//             <p>${product.description}</p>
//             <p>Price: $${product.price}</p>
//             <p>Rating: ${product.rating}</p>
//         `;
//   })
//   .catch((error) => console.error("Error fetching product details:", error));
