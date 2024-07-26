import React, { useState } from "react";

import { playerInterface } from "../interface";
import { radioContext } from "../Contexts/radioContext";

const RadioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [station, setStation] = useState<playerInterface>({
    _id: "",
    _score: 0,
    _source: {
      code: "",
      subtitle: "",
      type: "",
      title: "",
      stream: "",
      url: "",
    },
  });
  return (
    <>
      <radioContext.Provider value={{ station, setStation }}>
        {children}
      </radioContext.Provider>
    </>
  );
};

export default RadioProvider;
