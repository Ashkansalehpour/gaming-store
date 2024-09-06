import React, { useState, useEffect } from 'react';
import products from '../data/Products';
import ProductCard from '../components/ProductCard';
import Filter from '../components/Filter';

function ProductList({ searchTerm, onAddToCart }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    color: '',
    priceRange: [0, 1000],
    year: ''
  });

  useEffect(() => {
    const filtered = products.filter(product => {
      return (
        (searchTerm === '' ||
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.color.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filters.category === '' || product.category === filters.category) &&
        (filters.brand === '' || product.brand === filters.brand) &&
        (filters.color === '' || product.color === filters.color) &&
        (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]) &&
        (filters.year === '' || product.year === filters.year)
      );
    });
    setFilteredProducts(filtered);
  }, [searchTerm, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="product-list">
      <div className="filter-section">
        <Filter onFilterChange={handleFilterChange} />
      </div>
      <div className="product-section">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
