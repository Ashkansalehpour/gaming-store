import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import NavbarComponent from "./components/NavbarComponent";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";  // <-- Import the Cart component
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]); 

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleAddToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  };

  return (
    <Router>
      <div className="App">
        <NavbarComponent cartItems={cartItems} /> {/* Pass cartItems to Navbar */}
        <SearchBar onSearch={handleSearch} />
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={<ProductList searchTerm={searchTerm} onAddToCart={handleAddToCart} />} // Pass onAddToCart to ProductList
            />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} />} /> {/* Add Cart route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
