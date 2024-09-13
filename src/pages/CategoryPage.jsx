// src/pages/CategoryPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // To get category from the URL
import products from '../data/Products'; // Assuming you have all products stored here

const CategoryPage = () => {
  const { category } = useParams(); // Get category from the route parameters
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products by category and search term
  const filteredProducts = products.filter(
    product =>
      product.category?.toLowerCase() === category?.toLowerCase() && // Optional chaining to avoid undefined errors
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) // Optional chaining
  );

  return (
    <div className="category-page container">
      <h2>{category?.charAt(0).toUpperCase() + category?.slice(1)} Products</h2>

      <div className="product-list row">
        {filteredProducts.length === 0 ? (
          <p>No products found for this category.</p>
        ) : (
          filteredProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card">
                <img
                  src={`/assets/images/${product.image}`}
                  alt={product.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price: ${product.price}</p>
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
