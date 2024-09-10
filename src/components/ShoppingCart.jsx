import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ShoppingCart = ({ cartItems, removeFromCart, updateCartQuantity }) => { 
  const [isOpen, setIsOpen] = useState(false); 

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


  const increaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      updateCartQuantity(id, item.quantity + 1);
    }
  };


  const decreaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateCartQuantity(id, item.quantity - 1); 
    } else if (item && item.quantity === 1) {
      removeFromCart(item); 
    }
  };

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div 
      className={`nav-item dropdown ${isOpen ? 'show' : ''}`} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button">
        Cart ({cartItems.length})
      </Link>

      <ul 
        className={`dropdown-menu dropdown-menu-end ${isOpen ? 'show' : ''}`} 
        aria-labelledby="navbarDropdown"
        style={{
          minWidth: '400px',
          maxWidth: '600px',
          minHeight: '300px',
          padding: '10px',
          overflowY: 'auto',
        }}
      >
        {cartItems.length === 0 ? (
          <li className="dropdown-item">Your cart is empty</li>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <li className="dropdown-item d-flex justify-content-between align-items-center" key={index}>
                <div className="cart-item-info d-flex align-items-center">
                  <img 
                    src={`/assets/images/${item.image}`} 
                    alt={item.name} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} 
                  />
                  <div style={{ minWidth: '180px' }}>
                    <span>{item.name}</span><br />
                    <span className="text-muted">Total: ${item.price * item.quantity}</span>
                  </div>
                </div>
                <div className="quantity-controls ms-3 d-flex align-items-center">
                  <button className="btn btn-sm btn-secondary me-2" onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="btn btn-sm btn-secondary ms-2" onClick={() => increaseQuantity(item.id)}>+</button>
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
