// hooks/useDebounceValue.js
import { useState, useEffect } from 'react';

function useDebounceValue(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timer); // cleanup if value changes quickly
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounceValue;
