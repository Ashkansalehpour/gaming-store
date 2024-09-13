import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import NavbarComponent from "./components/NavbarComponent";
import SearchBar from "./components/SearchBar"; // Importing the updated SearchBar with live suggestions
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";
import products from "./data/Products"; // Assuming product data is stored here
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from localStorage on app load
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  // Save cart items to localStorage whenever the cartItems state changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to handle search input
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Function to add product to cart
  const handleAddToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingProduct = prevCartItems.find(item => item.id === product.id);
      if (existingProduct) {
        // If the product already exists in the cart, update the quantity
        return prevCartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If the product doesn't exist, add it to the cart with a quantity of 1
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to update product quantity in cart
  const updateCartQuantity = (productId, newQuantity) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(newQuantity, 0) } // Prevent negative quantity
          : item
      )
    );
  };

  // Function to remove product from cart
  const removeFromCart = (product) => {
    setCartItems(cartItems.filter(item => item.id !== product.id));
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar with cart information */}
        <NavbarComponent
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateCartQuantity={updateCartQuantity}
        />
        
        {/* Search bar with live suggestions */}
        <SearchBar onSearch={handleSearch} />

        <main className="container mt-4">
          <Routes>
            {/* Home page route */}
            <Route path="/" element={<Home />} />

            {/* Product listing page route with search functionality */}
            <Route
              path="/products"
              element={<ProductList searchTerm={searchTerm} onAddToCart={handleAddToCart} />}
            />

            {/* Product detail page route */}
            <Route
              path="/product/:id"
              element={<ProductDetail onAddToCart={handleAddToCart} />}
            />

            {/* Cart page route */}
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  updateCartQuantity={updateCartQuantity}
                  removeFromCart={removeFromCart}
                />
              }
            />

            {/* Dynamic route for category page */}
            <Route
              path="/category/:category"
              element={<CategoryPage onAddToCart={handleAddToCart} />}
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
