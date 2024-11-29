import { useEffect, useState } from "react";

export default async function useCallAPI(functionCallback: () => Promise<any>) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function onCall() {
    setLoading(true);
    return await functionCallback()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    onCall();
  }, []);

  return {
    data,
    loading,
    error,
  };
}
