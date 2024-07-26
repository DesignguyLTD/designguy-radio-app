import { useEffect, useState } from "react";

import CustomRadio from "../Components/CustomRadio";
import { PlayerContext } from "../Contexts/playerContext";
import RadioPlayer from "../playground/play";
import Search from "../Components/Search";
import { playerInterface } from "../interface";
import styles from "../CSSModules/Home.module.css";

function Home() {
  let BASEURL = "https://radio.garden/api/ara/content/listen/";
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

  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    const stream = station?._source.stream;
    const url = station?._source.url;
    const id = url?.split("/").pop(); // Extract the ID from the URL
    const fullUrl = stream ? `${BASEURL}${id}/channel.mp3` : null; // Construct the new URL
    if (fullUrl !== null) {
      setCurrentUrl(fullUrl); // Update the current URL
    }

    console.log("the fullUrl link", fullUrl);
  }, [station, BASEURL]);

  return (
    <section className={styles.main_pg}>
      <h1>
        Bringing the world <br /> <span className={styles.br}>closer</span> to
        you
      </h1>
      <PlayerContext.Provider value={{ station, setStation }}>
        <Search />
        <CustomRadio streamUrl={currentUrl} />
        <RadioPlayer streamUrl={currentUrl} />
      </PlayerContext.Provider>
    </section>
  );
}

export default Home;
