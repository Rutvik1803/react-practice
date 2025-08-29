import React, { useState, useEffect } from 'react';

const fetchPosts = async (page, limit = 10) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );
  return res.json();
};

const NumberedPagination = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10; // items per page
  const totalPages = 10; // API has 100 posts, so 100/10 = 10 pages

  useEffect(() => {
    loadPage(page);
  }, [page]);

  const loadPage = async (pageNum) => {
    setLoading(true);
    const data = await fetchPosts(pageNum, limit);
    setPosts(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Numbered Pagination Example</h2>
      {loading && <p>Loading...</p>}

      {!loading &&
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              padding: '12px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
            }}
          >
            <h4>
              {post.id}. {post.title}
            </h4>
            <p>{post.body}</p>
          </div>
        ))}

      {/* Pagination controls */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          Prev
        </button>

        {/* Generate page numbers dynamically */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            style={{
              fontWeight: page === i + 1 ? 'bold' : 'normal',
              backgroundColor: page === i + 1 ? '#ddd' : 'white',
              padding: '6px 12px',
              border: '1px solid #aaa',
              borderRadius: '4px',
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NumberedPagination;
