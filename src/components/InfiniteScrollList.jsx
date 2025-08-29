import React, { useState, useEffect } from 'react';

const fetchData = (page) => {
  // simulate API call: return 20 items per page
  return new Promise((resolve) => {
    setTimeout(() => {
      const newItems = Array.from(
        { length: 20 },
        (_, i) => `Item ${page * 20 + i + 1}`
      );
      resolve(newItems);
    }, 1000); // simulate 1 sec network delay
  });
};

const InfiniteScroll = () => {
  const [items, setItems] = useState([]); // all loaded items
  const [page, setPage] = useState(0); // current page number
  const [loading, setLoading] = useState(false); // is fetching
  const [hasMore, setHasMore] = useState(true); // if data is left

  useEffect(() => {
    loadMore(); // load initial items
  }, []);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const newItems = await fetchData(page);

    // stop if no more items after page 4 (limit 100 items here)
    if (page >= 4) {
      setHasMore(false);
    } else {
      setItems((prev) => [...prev, ...newItems]);
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
      <h2>Infinite Scroll Example</h2>
      <ul>
        {items.map((item, idx) => (
          <li key={idx} style={{ margin: '10px 0' }}>
            {item}
          </li>
        ))}
      </ul>
      {loading && <p>Loading more...</p>}
      {!hasMore && <p>No more items to load 🎉</p>}
    </div>
  );
};

export default InfiniteScroll;
