import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
const API = "http://localhost:5000";
const request = (path, options = {}) =>
  fetch(API + path, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
function App() {
  const [products, setProducts] = useState([]),
    [user, setUser] = useState(null),
    [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [mode, setMode] = useState("login"),
    [message, setMessage] = useState(""),
    [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      request("/products").then((r) => r.json()),
      request("/profile").then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([p, profile]) => {
        setProducts(p);
        if (profile) setUser(profile.user);
      })
      .catch(() => setMessage("Could not connect to the backend."))
      .finally(() => setLoading(false));
  }, []);
  async function submit(e) {
    e.preventDefault();
    setMessage("");
    const r = await request(`/auth/${mode}`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    const data = await r.json();
    setMessage(data.message);
    if (r.ok) {
      setUser(data.user);
      setName("");
      setEmail("");
      setPassword("");
    }
  }
  async function logout() {
    const r = await request("/auth/logout", { method: "POST" });
    setMessage((await r.json()).message);
    setUser(null);
    setName("");
    setEmail("");
    setPassword("");
  }
  async function adminCheck() {
    const r = await request("/admin");
    setMessage((await r.json()).message);
  }
  return (
    <main className="app">
      <header>{user && <button onClick={logout}>Log out</button>}</header>
      <section className="auth-panel">
        {user ? (
          <div>
            <h2>Welcome, {user.name || user.email}</h2>
            <p>
              Role: <strong>{user.role}</strong>
            </p>
            <button onClick={adminCheck}>Test admin access</button>
          </div>
        ) : (
          <>
            <div className="tabs">
              <button
                className={mode === "login" ? "active" : ""}
                onClick={() => setMode("login")}
              >
                Login
              </button>
              <button
                className={mode === "signup" ? "active" : ""}
                onClick={() => setMode("signup")}
              >
                Sign up
              </button>
            </div>
            <form onSubmit={submit}>
              {mode === "signup" && (
                <input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
              />
              <button type="submit">
                {mode === "login" ? "Log in" : "Create account"}
              </button>
            </form>
          </>
        )}
      </section>
      {message && <p className="status-message">{message}</p>}
      <h2>Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <section className="products-grid">
          {products.map((p) => (
            <ProductCard key={p.id} name={p.name} price={p.price} />
          ))}
        </section>
      )}
    </main>
  );
}
export default App;
