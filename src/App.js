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
const UserPanel = lazy(() => import("./pages/UserPanel")); // User panel page

// Define localStorage key constant for better maintainability
const CART_ITEMS_KEY = "cartItems";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem(CART_ITEMS_KEY);
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const [allProducts, setAllProducts] = useState(products);
  const [user, setUser] = useState(null); // User state for managing logged-in users

  useEffect(() => {
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const handleSearch = (term) => {
    setSearchTerm(term.trim());
  };

  const handleAddToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingProduct = prevCartItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return prevCartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
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
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== product.id)
    );
  };

  const handleAddProduct = (newProduct) => {
    setAllProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  // Handle user login
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Handle user logout
  const handleLogout = () => {
    setUser(null);
  };

  useEffect(() => {
    // Simulate a user logging in (for testing purposes)
    const mockUser = {
      name: "Ashi",
      email: "Ashi@example.com",
      profilePicture: "https://via.placeholder.com/150",
      createdAt: "2026-06-06",
    };

    handleLogin(mockUser);
  }, []);

  return (
    <Router>
      <div className="App">
        <NavbarComponent
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateCartQuantity={updateCartQuantity}
          user={user} // Pass the user to the NavbarComponent
          handleLogout={handleLogout} // Pass logout handler to Navbar
        />
        <SearchBar onSearch={handleSearch} />

        <main className="container mt-4">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home searchTerm={searchTerm} />} />
              <Route
                path="/products"
                element={
                  <ProductList
                    searchTerm={searchTerm}
                    onAddToCart={handleAddToCart}
                    products={allProducts}
                  />
                }
              />
              <Route
                path="/product/:id"
                element={<ProductDetail onAddToCart={handleAddToCart} />}
              />
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
              <Route
                path="/category/:category"
                element={<CategoryPage onAddToCart={handleAddToCart} />}
              />
              <Route
                path="/add-product"
                element={<AddProduct onAddProduct={handleAddProduct} />}
              />
              <Route path="/sign-up" element={<SignUp />} />
              <Route
                path="/user-panel"
                element={user ? <UserPanel user={user} /> : <SignUp />}
              />{" "}
              {/* User Panel Route */}
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
