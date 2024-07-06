import { useState, useEffect } from "react";

export default function useFetch(fetchfn, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchfn();
        setFetchedData(places);
      } catch (error) {
        setError({
          message: error.message || "Failed to fetch data.",
        });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, [fetchfn]);

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error,
  };
}
