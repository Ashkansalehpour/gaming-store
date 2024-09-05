// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, Button } from 'react-bootstrap';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <Form inline="true" onSubmit={handleSearchSubmit} className="ml-auto">
      <FormControl
        type="text"
        placeholder="Search Products"
        className="mr-sm-2"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Button type="submit" variant="outline-success">
        Search
      </Button>
    </Form>
  );
}

export default SearchBar;
