import { useEffect, useState } from "react";
import ProductCard from "./components/ProductsCard";


function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "laptop", price: 800 },
    { id: 2, name: "keyboard", price: 90 },
    { id: 3, name: "mouse", price: 20 },
  ]);


  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <h1> My products</h1>
      {products.map((product) => {
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
        />;
      })}
    </div>
  );
}

export default App;
