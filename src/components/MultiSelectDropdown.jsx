import React from 'react';

const MultiSelect = ({
  label,
  options,
  values = [],
  onChange,
  placeholder = 'Select options',
}) => {
  console.log('Valuss,', values);
  const handleChange = (e) => {
    const value = e.target.value;
    if (values.includes(value)) {
      // remove if already selected
      onChange(values.filter((v) => v !== value));
    } else {
      // add if not selected
      onChange([...values, value]);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        width: '220px',
      }}
    >
      {label && <label style={{ fontWeight: 'bold' }}>{label}</label>}

      <select
        multiple
        value={values}
        onChange={handleChange}
        style={{ padding: '8px', fontSize: '14px', height: '120px' }}
      >
        {options.length > 0 ? (
          options.map((opt, idx) => (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ))
        ) : (
          <option disabled>{placeholder}</option>
        )}
      </select>
    </div>
  );
};

export default MultiSelect;
