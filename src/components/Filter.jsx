// src/components/Filter.jsx
import React, { useState } from 'react';

function Filter({ onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1000]); // Set default min and max values
  const [selectedYear, setSelectedYear] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilterChange({ category: e.target.value, brand: selectedBrand, color: selectedColor, priceRange: selectedPriceRange, year: selectedYear });
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    onFilterChange({ category: selectedCategory, brand: e.target.value, color: selectedColor, priceRange: selectedPriceRange, year: selectedYear });
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
    onFilterChange({ category: selectedCategory, brand: selectedBrand, color: e.target.value, priceRange: selectedPriceRange, year: selectedYear });
  };

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value); // Parse the value to a number
    setSelectedPriceRange([0, value]); // Set range from 0 to the current value
    onFilterChange({ category: selectedCategory, brand: selectedBrand, color: selectedColor, priceRange: [0, value], year: selectedYear });
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    onFilterChange({ category: selectedCategory, brand: selectedBrand, color: selectedColor, priceRange: selectedPriceRange, year: e.target.value });
  };

  return (
    <div className="filter">
      <h4>Filter Products</h4>
      
      <div>
        <label>Category:</label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="Chairs">Chairs</option>
          <option value="Monitors">Monitors</option>
          <option value="Mice">Mice</option>
          <option value="Keyboards">Keyboards</option>
        </select>
      </div>
      
      <div>
        <label>Brand:</label>
        <select value={selectedBrand} onChange={handleBrandChange}>
          <option value="">All</option>
          <option value="Razer">Razer</option>
          <option value="Xiaomi">Xiaomi</option>
        </select>
      </div>
      
      <div>
        <label>Color:</label>
        <select value={selectedColor} onChange={handleColorChange}>
          <option value="">All</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
        </select>
      </div>
      
      <div>
        <label>Price Range: $0 - ${selectedPriceRange[1]}</label> {/* Show the selected max price */}
        <input 
          type="range" 
          min="0" 
          max="1000" 
          value={selectedPriceRange[1]} 
          onChange={handlePriceRangeChange} 
        />
        <span>${selectedPriceRange[0]} - ${selectedPriceRange[1]}</span>
      </div>
      
      <div>
        <label>Year:</label>
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">All</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
