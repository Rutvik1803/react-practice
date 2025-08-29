import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useMemo,
} from 'react';

const CartContext = createContext(null);

// initial state
const initialState = {
  items: [], // each item: { id, title, price, qty }
};

// reducer
function cartReducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, items: action.payload || [] };

    case 'ADD_ITEM': {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + (item.qty || 1) } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...item, qty: item.qty || 1 }],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };

    case 'INCREMENT':
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, qty: i.qty + 1 } : i
        ),
      };

    case 'DECREMENT':
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, qty: Math.max(1, i.qty - 1) } : i
        ),
      };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    default:
      return state;
  }
}

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Initialize from localStorage (once)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart');
      if (raw) dispatch({ type: 'INITIALIZE', payload: JSON.parse(raw) });
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  // Persist items to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state.items));
    } catch (e) {}
  }, [state.items]);

  // action wrappers (nice API for consumers)
  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const increment = (id) => dispatch({ type: 'INCREMENT', payload: id });
  const decrement = (id) => dispatch({ type: 'DECREMENT', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  // derived values
  const totalItems = state.items.reduce((s, it) => s + it.qty, 0);
  const totalPrice = state.items.reduce((s, it) => s + it.qty * it.price, 0);

  // memoize the provider value to avoid re-renders unless items / totals change
  const value = useMemo(
    () => ({
      items: state.items,
      addItem,
      removeItem,
      increment,
      decrement,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [state.items, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// custom hook for easy consumption
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
