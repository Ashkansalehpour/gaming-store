import React from "react";
import NavbarComponent from "../NavbarComponent";
import SearchBar from "./SearchBar";

const Header = ({ onSearch }) => {
  return (
    <header>
      <NavbarComponent />
      <SearchBar onSearch={onSearch} />
    </header>
  );
};

export default Header;
