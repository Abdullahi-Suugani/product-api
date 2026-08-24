function ProductCard({ name, price }) {
  return (
    <article className="product-card">
      <h2>{name}</h2>
      <p className="product-price">${price}</p>
    </article>
  );
}

export default ProductCard;
