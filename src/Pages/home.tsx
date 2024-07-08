import { useEffect, useState } from "react";
import Search from "../Components/Search";
import RadioPlayer from "../playground/play";
import styles from "../CSSModules/Home.module.css";
import { playerInterface } from "../interface";
import { PlayerContext } from "../Contexts/playerContext";

function Home() {
  let BASEURL = "https://radio.garden/api/ara/content/listen/";
  const [station, setStation] = useState<playerInterface>({
    _id: "string",
    _score: 0,
    _source: {
      code: "string",
      subtitle: "string",
      type: "string",
      title: "string",
      stream: "string",
      url: "string",
    },
  });

  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    const stream = station?._source.stream;
    const url = station?._source.url;
    const id = url?.split("/").pop(); // Extract the ID from the URL
    const fullUrl = stream ? stream : `${BASEURL}${id}/channel.mp3`; // Construct the new URL
    setCurrentUrl(fullUrl);
  }, [station, BASEURL]);

  return (
    <section className={styles.main_pg}>
      <h1>
        Bringing the world <br /> <span className={styles.br}>closer</span> to
        you
      </h1>
      <PlayerContext.Provider value={{station, setStation}}>
        <Search  />
        <RadioPlayer streamUrl={currentUrl} />
      </PlayerContext.Provider>
    </section>
  );
}

export default Home;
