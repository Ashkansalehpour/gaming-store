import React from 'react';

const Cart = ({ cartItems, updateCartQuantity, removeFromCart }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle decreasing the quantity
  const decreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      updateCartQuantity(id, quantity - 1); // Only decrease if quantity is greater than 1
    }
  };

  // Handle increasing the quantity
  const increaseQuantity = (id, quantity) => {
    updateCartQuantity(id, quantity + 1);
  };

  // Handle Pay button click
  const handlePay = () => {
    // This function can be extended later by backend integration to handle inventory updates.
    console.log("Pay button clicked, ready for backend integration");
  };

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
                    onClick={() => decreaseQuantity(item.id, item.quantity)} // Decrease quantity
                    disabled={item.quantity <= 1} // Disable the button if quantity is 1
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    className="btn btn-sm btn-secondary ms-2" 
                    onClick={() => increaseQuantity(item.id, item.quantity)} // Increase quantity
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

          {/* Pay Button */}
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-success btn-lg" onClick={handlePay}>
              Pay
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
