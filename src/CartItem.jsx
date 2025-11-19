import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // 🔹 Convert cost string "$15" → 15
  const parseCost = (costString) => parseFloat(costString.replace("$", ""));

  // 🔹 Calcola il totale dell'intero carrello
  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0)
      .toFixed(2);
  };

  // 🔹 Torna alla pagina dei prodotti
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  // 🔹 Incrementa quantità
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  // 🔹 Decrementa quantità (se arriva a 0 → removeItem)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      // quantità diventerebbe 0 → rimuovi
      dispatch(removeItem(item.name));
    }
  };

  // 🔹 Rimuovi articolo
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // 🔹 Subtotale per singolo item
  const calculateTotalCost = (item) => {
    return (parseCost(item.cost) * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      {cart.length === 0 ? (
        <h3 style={{ color: 'black' }}>Your cart is empty.</h3>
      ) : (
        <div>
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />

              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>

                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>

                  <span className="cart-item-quantity-value">{item.quantity}</span>

                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  Total: ${calculateTotalCost(item)}
                </div>

                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;