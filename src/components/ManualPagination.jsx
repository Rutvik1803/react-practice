import React, { useState, useEffect } from 'react';

const fetchPosts = async (page, limit = 10) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );
  return res.json();
};

const ManualPagination = () => {
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

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manual Pagination Example</h2>
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
      <div style={{ marginTop: '20px' }}>
        <button onClick={handlePrev} disabled={page === 1}>
          Previous
        </button>
        <span style={{ margin: '0 15px' }}>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ManualPagination;
