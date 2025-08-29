import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const ref = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      setHighlightIndex((prev) => (prev + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      setHighlightIndex((prev) => (prev === 0 ? options.length - 1 : prev - 1));
    } else if (e.key === 'Enter') {
      onSelect(options[highlightIndex]);
      setIsOpen(false);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        style={{ padding: '10px', cursor: 'pointer' }}
      >
        {label}
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul
          style={{
            position: 'absolute',
            marginTop: '5px',
            listStyle: 'none',
            padding: 0,
            border: '1px solid gray',
            background: 'white',
            width: '150px',
            zIndex: 100,
          }}
        >
          {options.map((option, index) => (
            <li
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              style={{
                padding: '8px',
                background: index === highlightIndex ? 'lightgray' : 'white',
                cursor: 'pointer',
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
