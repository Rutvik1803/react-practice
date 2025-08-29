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

function App() {
  const [count, setCount] = useState(0);

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
        <NumberedPagination />
      </div>
    </>
  );
}

export default App;
