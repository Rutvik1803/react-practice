import React from 'react';
import { useCart } from '../context/cartContext';

export default function Cart() {
  const {
    items,
    increment,
    decrement,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  if (items.length === 0)
    return (
      <div>
        <h3>Cart</h3>
        <p>Your cart is empty.</p>
      </div>
    );

  return (
    <div>
      <h3>Cart ({totalItems})</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((it) => (
          <li
            key={it.id}
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <div style={{ minWidth: 200 }}>
              <div>{it.title}</div>
              <div>
                ₹{it.price} x {it.qty} = ₹{it.price * it.qty}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => decrement(it.id)}>-</button>
              <button onClick={() => increment(it.id)}>+</button>
              <button onClick={() => removeItem(it.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 12 }}>
        <strong>Total: ₹{totalPrice}</strong>
      </div>
      <div style={{ marginTop: 8 }}>
        <button onClick={clearCart}>Clear Cart</button>
        <button style={{ marginLeft: 8 }}>Checkout</button>
      </div>
    </div>
  );
}
