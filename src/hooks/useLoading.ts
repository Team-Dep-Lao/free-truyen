import { useEffect, useState } from "react";

export default function useLoading(conditions: any[]) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timer);
  }, [...conditions]);

  return loading
}
