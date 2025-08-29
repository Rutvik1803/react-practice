import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setQuery, fetchUsers } from '../features/search/searchSlice';
import useDebounceValue from '../hooks/useDebounce';

const SearchField = () => {
  const dispatch = useDispatch();
  const { query, results, loading, error } = useSelector(
    (state) => state.search
  );

  // Debounced version of query
  const debouncedQuery = useDebounceValue(query, 500);

  useEffect(() => {
    if (debouncedQuery.trim() !== '') {
      dispatch(fetchUsers(debouncedQuery));
    }
  }, [debouncedQuery, dispatch]);

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>GitHub User Search (Redux)</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        placeholder="Search GitHub users..."
        style={{ width: '250px', height: '35px' }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {results.map((user) => (
          <li
            key={user.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: '10px 0',
              justifyContent: 'center',
            }}
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              width="40"
              height="40"
              style={{ borderRadius: '50%' }}
            />
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'none', color: 'blue' }}
            >
              {user.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchField;
