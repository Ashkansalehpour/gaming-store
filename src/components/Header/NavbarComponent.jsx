import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ShoppingCart from "./ShoppingCart";
import "../../styles/Navbar.css"; 
const NavbarComponent = ({
  cartItems,
  removeFromCart,
  updateCartQuantity,
  user,
  handleLogout,
}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Ashi Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-product">
                Add Product
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {/* User Profile Picture or Sign Up */}
            {user ? (
              <>
                <li className="nav-item dropdown">
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="rounded-circle"
                    width="40"
                    height="40"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ cursor: "pointer" }}
                  />
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/user-panel">
                        User Panel
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/sign-up">
                  Sign Up
                </Link>
              </li>
            )}

            {/* Cart Icon */}
            <li className="nav-item">
              <ShoppingCart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateCartQuantity={updateCartQuantity}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
