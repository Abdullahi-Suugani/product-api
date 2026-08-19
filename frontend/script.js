fetch("http://localhost:5000/products")
  .then((response) => response.json())
  .then((products) => {
    const productsContainer = document.getElementById("products");

    products.forEach((product) => {
      const productElement = document.createElement("div");

      productElement.className = "product-card";
      productElement.innerHTML = ` <h2>${product.name}</h2>
      <p class="product-price">${product.price}</p>`;
      productsContainer.appendChild(productElement);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
