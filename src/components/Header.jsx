// src/components/Header.jsx
import React from 'react';
import NavbarComponent from './NavbarComponent';
import SearchBar from './SearchBar';

function Header() {
  return (
    <header>
      <NavbarComponent />
      <div className="container mt-2">
        <SearchBar />
      </div>
    </header>
  );
}

export default Header;
