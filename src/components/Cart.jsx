import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItem } from '../reducer/addToCart';
import "bootstrap/dist/css/bootstrap.min.css"

const Cart = () => {
  const data = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const cart = data?.cartItems || [];

  const handleIncreaseQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemoveItem = (id) => {
    const confirmation = window.confirm("Are you sure you want to remove this item?");
    if (confirmation) {
      dispatch(removeItem(id));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div>
      <h1>Cart List</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cart.map((item) => (
            <li key={item.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{
                    width: '100px',
                    height: 'auto',
                    marginRight: '20px',
                    borderRadius: '8px',
                  }}
                />
                <div>
                  <h3>{item.title}</h3>
                  <p>Category: {item.category}</p>
                  <p>Price: ${item.price}</p>
                  <p>Rating: {item.rating} / 5</p>
                  <div className='d-flex'>
                    <button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      disabled={item.quantity <= 1}
                      style={{ margin: '0 10px', padding: '5px',borderRadius:'10%', cursor: 'pointer' }}
                    >
                      -
                    </button>
                    <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      style={{ padding: '5px', cursor: 'pointer' }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      style={{ marginLeft: '10px', padding: '5px 10px', background: 'red', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <div style={{ marginTop: '20px', padding: '10px', borderTop: '2px solid #ddd', fontSize: '18px', textAlign: 'right' }}>
          <strong>Total: </strong>${calculateTotal()}
        </div>
      )}
    </div>
  );
};

export default Cart;
