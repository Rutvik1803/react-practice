import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Counter from './components/Counter';
import Todo from './components/Todo';
import SearchField from './components/ReduxDebouncedSearch';
import Stopwatch from './components/Stopwatch';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        {/* <Counter /> */}
        {/* <Todo /> */}
        {/* <SearchField /> */}
        {/* <SearchField /> */}
        <Stopwatch />
      </div>
    </>
  );
}

export default App;
