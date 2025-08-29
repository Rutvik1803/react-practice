import React from 'react';

const Select = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        width: '200px',
      }}
    >
      {label && <label style={{ fontWeight: 'bold' }}>{label}</label>}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ padding: '8px', fontSize: '14px' }}
      >
        <option value="">{placeholder}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
