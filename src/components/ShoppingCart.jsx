import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ShoppingCart = ({ cartItems, removeFromCart }) => {
  const [isOpen, setIsOpen] = useState(false); 


  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

 
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div 
      className={`nav-item dropdown ${isOpen ? 'show' : ''}`} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        className="nav-link dropdown-toggle" 
        to="#" 
        id="navbarDropdown"
        role="button"
      >
        Cart ({cartItems.length})
      </Link>
      <ul className={`dropdown-menu dropdown-menu-end ${isOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
        {cartItems.length === 0 ? (
          <li className="dropdown-item">Your cart is empty</li>
        ) : (
          <>
            {cartItems.slice(0, 3).map((item, index) => (
              <li className="dropdown-item d-flex justify-content-between align-items-center" key={index}>
                <div className="cart-item-info d-flex align-items-center">
                  <img 
                    src={`/assets/images/${item.image}`}
                    alt={item.name} 
                    style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }} 
                  />
                  <div>
                    <span>{item.name}</span><br/>
                    <span className="text-muted">${item.price}</span>
                  </div>
                </div>
                <button className="btn btn-sm btn-danger ms-3" onClick={() => removeFromCart(item)}>
                  Remove
                </button>
              </li>
            ))}
            <li><hr className="dropdown-divider" /></li>
            <li className="dropdown-item text-end"><strong>Total: ${totalPrice}</strong></li>
            <li>
              <Link className="dropdown-item text-center" to="/cart">View All Products</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default ShoppingCart;
