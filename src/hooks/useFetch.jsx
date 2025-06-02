// src/hooks/useFetch.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (api) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api);
        const result = response.data;

        // Firebase returns an object, not an array
        const loadedData = Object.keys(result).map((key) => ({
          id: key,
          ...result[key],
        }));

        setData(loadedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [api]);

  return { data, loading, error };
};

export default useFetch;
