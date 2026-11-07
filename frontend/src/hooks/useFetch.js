import { useCallback, useEffect, useState } from "react";

export const useFetch = (fetcher) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [fetcher, reloadKey]);

  const refetch = useCallback(() => {
    setLoading(true);
    setError("");
    setReloadKey((key) => key + 1);
  }, []);

  return { data, loading, error, refetch };
};