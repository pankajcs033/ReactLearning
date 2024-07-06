import { useEffect, useState, useCallback } from "react";

async function httpRequest(url, method) {
  const response = await fetch(url, method);
  const resData = response.json();
  if (!response.ok) {
    throw new Error(resData.message || "unable to process request");
  }
  return resData;
}

export default function useHttp(url, config, initialData) {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);

  const sentHttpRequest = useCallback(
    async function sentHttpRequest(data) {
      setIsLoading(true);
      try {
        const resData = await httpRequest(url, { ...config, body: data });
        setData(resData);
        console.log(resData);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
      setIsLoading(false);
    },
    [url, config]
  );

  function clearData() {
    setData();
  }

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config)
      sentHttpRequest();
  }, [sentHttpRequest, config]);

  return {
    data,
    error,
    isLoading,
    sentHttpRequest,
    clearData,
  };
}
