import React, { useReducer } from 'react';

// simple validators
const validateName = (name) => {
  if (!name.trim()) return 'Name is required';
  if (name.trim().length < 3) return 'Name must be at least 3 characters';
  return '';
};

const validateEmail = (email) => {
  if (!email.trim()) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Invalid email format';
  return '';
};

const validatePassword = (password) => {
  if (!password.trim()) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return '';
};

// initial state
const initialState = {
  values: { name: '', email: '', password: '' },
  errors: { name: '', email: '', password: '' },
  isValid: false,
};

// reducer
function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      const { field, value } = action.payload;

      // validate the field
      let error = '';
      if (field === 'name') error = validateName(value);
      if (field === 'email') error = validateEmail(value);
      if (field === 'password') error = validatePassword(value);

      const newValues = { ...state.values, [field]: value };
      const newErrors = { ...state.errors, [field]: error };

      // form is valid if no errors and all fields filled
      const isValid =
        Object.values(newErrors).every((e) => e === '') &&
        Object.values(newValues).every((v) => v.trim() !== '');

      return { values: newValues, errors: newErrors, isValid };
    }

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

const SignupForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', payload: { field: name, value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', state.values);
    dispatch({ type: 'RESET' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '400px',
        margin: '30px auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <h2>Signup Form</h2>

      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={state.values.name}
          onChange={handleChange}
        />
        {state.errors.name && (
          <div style={{ color: 'red', fontSize: '12px' }}>
            {state.errors.name}
          </div>
        )}
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={state.values.email}
          onChange={handleChange}
        />
        {state.errors.email && (
          <div style={{ color: 'red', fontSize: '12px' }}>
            {state.errors.email}
          </div>
        )}
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.values.password}
          onChange={handleChange}
        />
        {state.errors.password && (
          <div style={{ color: 'red', fontSize: '12px' }}>
            {state.errors.password}
          </div>
        )}
      </div>

      <button type="submit" disabled={!state.isValid}>
        Submit
      </button>
    </form>
  );
};

export default SignupForm;
