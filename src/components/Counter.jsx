// import React, { useState } from 'react';

// const Counter = () => {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <h1>Counter: {count}</h1>
// <button onClick={() => setCount(count + 1)}>Increment</button>
// <button onClick={() => setCount(count - 1)}>Decrement</button>
// <button onClick={() => setCount(0)}>Reset</button>
//     </div>
//   );
// };

// export default Counter;

import React, { useState } from 'react';
import useCounter from '../hooks/useCounter';

const Counter = () => {
  const [step, setStep] = useState(1);
  const { count, setCount, increment, decrement, reset } = useCounter(0, step);
  return (
    <div>
      <h1>Counter: {count}</h1>
      <select
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
        style={{ width: '100px' }}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
      </select>
      <div>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;
