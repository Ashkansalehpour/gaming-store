import React from 'react';

const Cart = ({ cartItems, onRemoveFromCart }) => {
  if (cartItems.length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  return (
    <div className="cart container">
      <h2>Your Shopping Cart</h2>
      <ul className="list-group">
        {cartItems.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{item.name} - ${item.price}</span>
            <button className="btn btn-danger btn-sm" onClick={() => onRemoveFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
