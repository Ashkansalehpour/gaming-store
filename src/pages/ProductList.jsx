// src/pages/ProductList.jsx
import React, { useState } from 'react';
import products from '../data/Products';
import ProductCard from '../components/ProductCard';
import Filter from '../components/Filter';

function ProductList() {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilterChange = (filters) => {
    const filtered = products.filter((product) => {
      return (
        (filters.category === '' || product.category === filters.category) &&
        (filters.brand === '' || product.brand === filters.brand) &&
        (filters.color === '' || product.color === filters.color) &&
        (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]) &&
        (filters.year === '' || product.year === parseInt(filters.year))
      );
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="product-list">
      <div className="filter-section">
        <Filter onFilterChange={handleFilterChange} />
      </div>
      <div className="product-section">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
