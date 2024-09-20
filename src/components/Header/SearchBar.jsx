import React, { useState } from "react";
import { Link } from "react-router-dom";
import products from "../../data/Products";
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); 
  };

  return (
    <div className="search-bar my-4">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="form-control"
      />

      {/* Show search results */}
      {searchTerm && (
        <ul className="list-group">
          {filteredProducts.map((product) => (
            <li key={product.id} className="list-group-item">
              {/* Link to product details page */}
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
