import { useEffect, useState } from "react";

import ApiData from "./RadioContext";
import PausePlay from "../Components/PausePlay";

export default function ContextProvider() {
  const [data, setData] = useState<Response | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const resp = await fetch("end-point");
        const respData = await resp.json();
        setData(respData);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const contextValue = {
    data,
    loading,
    error,
  };

  return (
    <ApiData.Provider value={contextValue}>
      <PausePlay />
    </ApiData.Provider>
  );
}
