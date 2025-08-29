// import React, { useEffect, useState } from 'react';
// import useDebounce from '../hooks/useDebounce';

// const SearchField = () => {
//   const [searchText, setSearchText] = useState('');

//   const debouncedSearch = useDebounce(searchText, 500);

//   useEffect(() => {
//     if (debouncedSearch.trim() !== '') {
//       console.log('API call with:', debouncedSearch);
//       // 👉 here you would actually fetch data from an API
//     }
//   }, [debouncedSearch]);

//   return (
//     <div>
//       <input
//         type="text"
//         value={searchText}
//         onChange={(e) => setSearchText(e.target.value)}
//         placeholder="add text to search"
//         style={{ height: '50px', width: '200px' }}
//       />
//     </div>
//   );
// };

// export default SearchField;

import React, { useState, useEffect } from 'react';
import useDebounceValue from '../hooks/useDebounce';

const SearchField = () => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce the search text (500ms delay)
  const debouncedSearchText = useDebounceValue(searchText, 500);

  useEffect(() => {
    // If empty, reset state
    if (debouncedSearchText.trim() === '') {
      setResults([]);
      return;
    }

    const controller = new AbortController(); // cancel old requests
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://api.github.com/search/users?q=${debouncedSearchText}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error('API error: ' + res.status);

        const data = await res.json();
        setResults(data.items || []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    // Cleanup to cancel previous requests
    return () => controller.abort();
  }, [debouncedSearchText]);

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>GitHub User Search</h2>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search GitHub users..."
        style={{ width: '250px', height: '35px' }}
      />

      {/* Loading & Error States */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Results */}
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
