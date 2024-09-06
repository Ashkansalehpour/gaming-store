// src/pages/Cart.jsx
import React from 'react';

const Cart = ({ cartItems }) => {
  if (cartItems.length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
