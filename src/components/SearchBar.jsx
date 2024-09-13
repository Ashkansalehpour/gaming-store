import React, { useState, useEffect } from 'react';
import products from '../data/Products'; // Assuming you have your product list in Products.js

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Function to handle input changes and provide live suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      // Filter the products based on the search term
      const filteredSuggestions = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }

    // Call the onSearch prop to filter products on the main page
    onSearch(value);
  };

  // Function to handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setSuggestions([]); // Hide suggestions after selecting one
    onSearch(suggestion.name); // Update the main search with the selected product
  };

  return (
    <div className="search-bar-container position-relative">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleInputChange}
        className="form-control"
      />
      
      {/* Live product suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul className="suggestions-list list-group position-absolute w-100" style={{ zIndex: 1000 }}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="list-group-item list-group-item-action"
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ cursor: 'pointer' }}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
