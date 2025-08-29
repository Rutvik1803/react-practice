import React from 'react';
import { useCart } from '../context/cartContext';

const sampleProducts = [
  { id: 1, title: 'T-shirt', price: 399 },
  { id: 2, title: 'Cap', price: 199 },
  { id: 3, title: 'Sneakers', price: 2499 },
];

export default function ProductList() {
  const { addItem } = useCart();

  return (
    <div>
      <h3>Products</h3>
      {sampleProducts.map((p) => (
        <div key={p.id} style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
          <div>
            <strong>{p.title}</strong>
            <div>₹{p.price}</div>
          </div>
          <button onClick={() => addItem(p)}>Add to cart</button>
        </div>
      ))}
    </div>
  );
}
