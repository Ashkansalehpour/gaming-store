import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NavbarComponent from "./components/Header/NavbarComponent";
import SearchBar from "./components/Header/SearchBar";
import Footer from "./components/Footer/Footer";
import products from "./data/Products";
import "./App.css";

// Lazy-loaded components for performance optimization
const Home = lazy(() => import("./pages/Home"));
const ProductList = lazy(() => import("./pages/ProductList"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const SignUp = lazy(() => import("./pages/SignUp"));

// Define localStorage key constant for better maintainability
const CART_ITEMS_KEY = "cartItems";

function App() {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem(CART_ITEMS_KEY);
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const [allProducts, setAllProducts] = useState(products);

  useEffect(() => {
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const handleSearch = (term) => {
    setSearchTerm(term.trim());
  };

  const handleAddToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingProduct = prevCartItems.find((item) => item.id === product.id);
      
      if (existingProduct) {
        return prevCartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(newQuantity, 0) }
          : item
      )
    );
  };

  const removeFromCart = (product) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== product.id));
  };

  const handleAddProduct = (newProduct) => {
    setAllProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <Router>
      <div className="App">
        <NavbarComponent
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateCartQuantity={updateCartQuantity}
        />
        <SearchBar onSearch={handleSearch} />

        <main className="container mt-4">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home searchTerm={searchTerm} />} />
              <Route path="/products" element={<ProductList searchTerm={searchTerm} onAddToCart={handleAddToCart} products={allProducts} />} />
              <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
              <Route path="/cart" element={<Cart cartItems={cartItems} updateCartQuantity={updateCartQuantity} removeFromCart={removeFromCart} />} />
              <Route path="/category/:category" element={<CategoryPage onAddToCart={handleAddToCart} />} />
              <Route path="/add-product" element={<AddProduct onAddProduct={handleAddProduct} />} />
              <Route path="/sign-up" element={<SignUp />} /> {/* Add the SignUp route */}
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
