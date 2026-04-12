import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-serif font-bold text-primary mb-4">Your Cart is Empty</h1>
        <p className="text-dark-text mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link to="/products">
          <Button>Browse The Collection</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-primary mb-8">Shopping Cart</h1>
      <div className="bg-surface border border-gray-800">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center p-4 border-b border-gray-800 last:border-b-0">
            <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover" />
            <div className="flex-grow ml-4">
              <h2 className="font-serif font-bold text-lg text-primary">{item.name}</h2>
              <p className="text-secondary">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                min="1"
                className="w-16 p-2 text-center bg-background border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button onClick={() => removeFromCart(item.id)} className="text-red-500/70 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end items-center">
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">
            Total: <span className="text-primary">${totalCost.toFixed(2)}</span>
          </p>
          <p className="text-secondary text-sm">Taxes and shipping calculated at checkout.</p>
          <Button className="mt-4">Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
