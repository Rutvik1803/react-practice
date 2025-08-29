import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Counter from './components/Counter';
import Todo from './components/Todo';
import SearchField from './components/ReduxDebouncedSearch';
import Stopwatch from './components/Stopwatch';
import SignupForm from './components/FormValidationReducer';
// import InfiniteScroll from './components/InfiniteScrollList';
import InfiniteScrollAPI from './components/InfiniteScrollApi';
import ManualPagination from './components/ManualPagination';
import NumberedPagination from './components/ManualPaginationWithNumbers';
import ProductList from './components/ProductList';
import Cart from './components/ContextCart';
import { useTheme } from './context/ThemeContext';

function App() {
  const [count, setCount] = useState(0);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div>
        {/* <Counter /> */}
        {/* <Todo /> */}
        {/* <SearchField /> */}
        {/* <SearchField /> */}
        {/* <Stopwatch /> */}
        {/* <SignupForm /> */}
        {/* <InfiniteScrollAPI /> */}
        {/* <ManualPagination /> */}
        {/* <NumberedPagination /> */}
        <ProductList />
        <Cart />
        <button onClick={() => toggleTheme()}>Change Theme</button>
      </div>
    </>
  );
}

export default App;

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { addToCart, removeFromCart } from './features/cart/cartSlice';

// function App() {
//   const cart = useSelector((state) => state.cart);
//   const theme = useSelector((state) => state.theme);
//   const dispatch = useDispatch();

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Redux Example</h1>
//       <h2>Theme: {theme}</h2>
//       {/* <button onClick={() => dispatch(toggleTheme())}>Switch Theme</button> */}

//       <h2>Cart Items: {cart.length}</h2>
//       <button onClick={() => dispatch(addToCart({ id: 1, name: 'Laptop' }))}>
//         Add Laptop
//       </button>
//       <button onClick={() => dispatch(removeFromCart(1))}>Remove Laptop</button>
//     </div>
//   );
// }

// export default App;
