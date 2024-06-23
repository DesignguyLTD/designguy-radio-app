import React, { useContext } from "react";

import ApiData from "../Contexts/RadioContext";

const PausePlay = () => {
  const { data, loading, error } = useContext(ApiData);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return <p>No data available.</p>;
  }
  return <div>{data.status}</div>;
};

export default PausePlay;
