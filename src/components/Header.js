import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Gaming Store</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;