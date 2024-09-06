import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/Products';

function ProductDetail() {
  const { id } = useParams(); // Get the product ID from the URL
  const product = products.find((p) => p.id === parseInt(id)); // Find the product by its ID

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <img src={`/assets/images/${product.image}`} alt={product.name} className="img-fluid" />
      <p>Price: ${product.price}</p>
      <p>Date Added: {product.dateAdded}</p>
      <p>Category: {product.category}</p>
    </div>
  );
}

export default ProductDetail;
