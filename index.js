const express = require("express");

const app = express();

app.use(express.json());

let products = [];

app.post("/products", (req, res) => {
  const product = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
  };

  products.push(product);

  res.status(201).json(product);
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  product.name = req.body.name;
  product.price = req.body.price;

  res.json(product);
});

app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const deletedProduct = products.splice(productIndex, 1);

  res.json({
    message: "Product deleted successfully",
    product: deletedProduct[0],
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
