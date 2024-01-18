// useProductListCache.js
import { useState, useEffect } from 'react';

const useProductListCache = (key) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedData = localStorage.getItem(key);

    if (cachedData) {
      setData(JSON.parse(cachedData));
    }

    setLoading(false);
  }, [key]);

  const revalidate = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://dummyjson.com/products');
      const newData = await response.json();

      setData(newData.products);
      localStorage.setItem(key, JSON.stringify(newData.products));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, revalidate };
};

export default useProductListCache;
