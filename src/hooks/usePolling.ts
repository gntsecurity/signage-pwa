import { useState, useEffect } from 'react';

export function usePolling<T>(url: string, interval: number = 30000) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('An error occurred');
      }
    };

    fetchData(); // Fetch immediately
    const intervalId = setInterval(fetchData, interval); // Set up polling

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [url, interval]);

  return { data, error };
}
