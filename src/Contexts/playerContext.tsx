import { createContext } from "react";
import { playerInterface } from "../interface";

export const PlayerContext = createContext({
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

  setStation: (value: playerInterface) => {},
});
