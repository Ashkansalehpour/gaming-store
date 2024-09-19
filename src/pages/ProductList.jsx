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
      // Ensure the fields we're checking exist to avoid errors
      const productName = product.name ? product.name.toLowerCase() : '';
      const productBrand = product.brand ? product.brand.toLowerCase() : '';
      const productColor = product.color ? product.color.toLowerCase() : '';

      return (
        (searchTerm === '' ||
          (productName && productName.includes(searchTerm.toLowerCase())) ||
          (productBrand && productBrand.includes(searchTerm.toLowerCase())) ||
          (productColor && productColor.includes(searchTerm.toLowerCase()))) &&
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
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
            />
          ))
        ) : (
          <h3>No products found matching your criteria.</h3> // Handle no results
        )}
      </div>
    </div>
  );
}

export default ProductList;
