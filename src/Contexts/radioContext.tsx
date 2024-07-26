import { createContext } from "react";
import { playerInterface } from "../interface";

interface RadioContextType {
  station: playerInterface;
  setStation: (value: playerInterface) => void;
}

export const radioContext = createContext<RadioContextType>({
  station: {
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
  },
  setStation: () => {},
});
