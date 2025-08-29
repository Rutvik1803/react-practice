import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Counter from './components/Counter';
import Todo from './components/Todo';
import SearchField from './components/ReduxDebouncedSearch';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        {/* <Counter /> */}
        {/* <Todo /> */}
        {/* <SearchField /> */}
        <SearchField />
      </div>
    </>
  );
}

export default App;
