import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";

const API_URL = "http://localhost:5000/products";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Could not load products. Please make sure the backend is running on port 5000.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className="app">
      <h1>My Products</h1>

      {loading && <p className="status-message">Loading products...</p>}

      {error && <p className="status-message error-message">{error}</p>}

      {!loading && !error && (
        <section className="products-grid" aria-label="Product list">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default App;
