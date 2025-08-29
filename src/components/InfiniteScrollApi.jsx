import React, { useState, useEffect } from 'react';

// fetch posts API (20 per page)
const fetchPosts = async (page, limit = 20) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );
  return res.json();
};

const InfiniteScrollAPI = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // start from page 1
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadMore(); // load initial data
  }, []);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const newPosts = await fetchPosts(page);

    if (newPosts.length === 0) {
      setHasMore(false); // no more posts available
    } else {
      setPosts((prev) => [...prev, ...newPosts]);
      setPage((prev) => prev + 1);
    }

    setLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (bottom && !loading && hasMore) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Infinite Scroll with API</h2>
      {posts.map((post) => (
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
      {loading && <p>Loading more posts...</p>}
      {!hasMore && <p>No more posts to load 🎉</p>}
    </div>
  );
};

export default InfiniteScrollAPI;
