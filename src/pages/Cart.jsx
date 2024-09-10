import React from 'react';

const Cart = ({ cartItems, updateCartQuantity, removeFromCart }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-page container">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group">
            {cartItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="cart-item-info d-flex align-items-center">
                  <img 
                    src={`/assets/images/${item.image}`} 
                    alt={item.name} 
                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '20px' }} 
                  />
                  <div>
                    <span>{item.name}</span><br />
                    <span className="text-muted">Price: ${item.price}</span><br />
                    <span className="text-muted">Total: ${item.price * item.quantity}</span>
                  </div>
                </div>
                <div className="quantity-controls d-flex align-items-center">
                  <button 
                    className="btn btn-sm btn-secondary me-2" 
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)} // Update quantity
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    className="btn btn-sm btn-secondary ms-2" 
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)} // Update quantity
                  >
                    +
                  </button>
                </div>
                <button className="btn btn-sm btn-danger ms-3" onClick={() => removeFromCart(item)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total mt-4 text-end">
            <h4>Total Price: ${totalPrice}</h4>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
