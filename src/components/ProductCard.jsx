import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={`/assets/images/${product.image}`} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price}</p>
        {/* View Detail button */}
        <Link to={`/product/${product.id}`} className="btn btn-primary">
          View Detail
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
