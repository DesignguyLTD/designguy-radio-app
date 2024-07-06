import { useState } from "react";
import PausePlay from "../Components/PausePlay";
import Search from "../Components/Search";

interface searchItem {
    _id: string;
    _score: number;
    _source: {
      code: string;
      subtitle: string;
      type: string;
      title: string;
      url: string;
    };
  }

function Player () {
    const [station, setStation] = useState<searchItem>();

    return (
        <section>
            <Search handleStationClick={setStation} />
            {/* The source data is station and this is also the page that 
                the player would be so that the station would just be passed as a prop to it */}
        </section>
    )
}

export default Player;