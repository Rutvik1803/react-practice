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
import Modal from './components/Modal';
import Dropdown from './components/ReusableDropDown';
import SearchableSelect from './components/ReusableSearchDropdown';
import Select from './components/ReusableSearchDropdown';
import MultiSelect from './components/MultiSelectDropdown';

function App() {
  // const [count, setCount] = useState(0);
  // const { theme, toggleTheme } = useTheme();
  // const [isModalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const fruits = ['Apple', 'Banana', 'Mango', 'Orange', 'Pineapple', 'Papaya'];

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
        {/* <ProductList />
        <Cart />
        <button onClick={() => toggleTheme()}>Change Theme</button> */}
        {/* Modal usage code start */}
        {/* <div style={{ padding: 20 }}>
          <h1>Reusable Modal Example</h1>
          <button onClick={() => setModalOpen(true)}>Open Modal</button>

          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <h2>Hello from Modal 👋</h2>
            <p>This is a reusable modal component.</p>
          </Modal>
        </div> */}
        {/* Modal usage code ends here --------------------------------- */}

        {/* Reusabel Drop down code starts from here ------------------------------ */}
        {/* <div style={{ padding: 20 }}>
          <h1>Reusable Dropdown Example</h1>
          <p>Selected: {selected}</p>

          <Dropdown
            label="Select Fruit"
            options={['Apple', 'Banana', 'Mango', 'Orange']}
            onSelect={(option) => setSelected(option)}
          />
        </div> */}

        {/* <div style={{ padding: 20 }}>
          <h1>Reusable Select Component</h1>

          <Select
            label="Choose a Fruit"
            options={fruits}
            value={selected}
            onChange={setSelected}
            placeholder="-- Select Fruit --"
          />

          <p>Selected: {selected || 'None'}</p>
        </div> */}
        {/* Reusabel Drop down code ends from here ------------------------------ */}

        {/* Multi select starts */}

        <div style={{ padding: 20 }}>
          <h1>Reusable Multi-Select Component</h1>

          <MultiSelect
            label="Choose Fruits"
            options={fruits}
            values={selected}
            onChange={setSelected}
          />

          <p>Selected: {selected.length > 0 ? selected.join(', ') : 'None'}</p>
        </div>

        {/* Multiselect ends */}
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
