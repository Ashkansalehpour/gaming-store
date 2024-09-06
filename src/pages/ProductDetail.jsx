import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/Products';
import '../styles/ProductDetail.css';

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-detail container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img src={`/assets/images/${product.image}`} alt={product.name} className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p className="text-muted">Category: {product.category}</p>
          <p className="price">Price: ${product.price}</p>
          <p>Date Added: {product.dateAdded}</p>
          <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
          
          {/* Add to Cart button */}
          <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
