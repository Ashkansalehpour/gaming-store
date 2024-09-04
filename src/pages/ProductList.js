import React from 'react';
import products from '../data/Products';
import ProductCard from '../components/ProductCard';

function ProductList() {
  return (
    <div className="product-list">
      <h2>All Products</h2>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;