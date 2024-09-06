import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onSearch(event.target.value); 
  };

  return (
    <form className="d-flex">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search products..."
        aria-label="Search"
        value={inputValue}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default SearchBar;
