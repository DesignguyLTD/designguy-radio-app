import { useCallback, useEffect, useRef, useState } from "react";

import { Response } from "../Contexts/Types";
import { dummy } from "./Dummy";

export default function Radio() {
  let BASEURL = "https://radio.garden";

  const [data, setData] = useState<Response | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  let audioRef = useRef<HTMLAudioElement>(new Audio());
  const [currentRadio, setCurrentRadio] = useState<number>(0);
  const [radioPlaying, setRadioPlaying] = useState<boolean>(false);
  const [radioLinks, setRadioLinks] = useState<string[]>([]);

  const loadAudio = useCallback((url: string) => {
    const audio = audioRef.current;
    audio.src = url;

    console.log("Loading audio site:", url);

    audio.addEventListener("error", (e) => {
      console.error("Error loading audio", e);
      setError("Failed to load audio");
    });

    audio.addEventListener("loaded audio", () => {
      console.log("Audio loaded");
    });

    try {
      audio.load(); // Attempt to load the audio
    } catch (err) {
      console.error("Error loading audio:", err);
      setError("Failed to load audio");
      // Handle loading errors gracefully (e.g., display an error message)
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = dummy as Response;
        setData(response);
        const links = response.hits.hits
          .map((hit) =>
            hit._source.stream ? `${BASEURL}${hit._source.url}` : null
          )
          .filter((url): url is string => url !== null);
        console.log(links, 'links');
        setRadioLinks(links);
        if (links.length > 0) {
          loadAudio(links[0]);
        }
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    console.log("This works");
    loadData();
  }, [BASEURL, loadAudio]);

  if (loading) {
    return <> Loading...</>;
  }

  if (error) {
    return <> Error: {error}</>;
  }

  const playAudio = () => {
    const audio = audioRef.current;
    if (audio.src) {
      console.log("This is playing");
      audio.play().catch((err) => {
        console.error("Error playing the audio", err);
      });

      setRadioPlaying(true);
    } else {
      setError("No Audio source available");
      console.log(error);
    }
  };

  const pauseAudio = () => {
    const audio = audioRef.current;
    audio.pause();
    setRadioPlaying(false);
  };

  const playHandler = () => {
    if (radioPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const forwardHandler = () => {
    if (currentRadio < radioLinks.length - 1) {
      const nextRadio = currentRadio + 1;
      setCurrentRadio(nextRadio);
      loadAudio(radioLinks[nextRadio]);

      if (radioPlaying) {
        playAudio();
      }
    }
  };

  const backwardHandler = () => {
    if (currentRadio > 0) {
      const prevRadio = currentRadio - 1;
      setCurrentRadio(prevRadio);
      loadAudio(radioLinks[prevRadio]);
      if (radioPlaying) {
        playAudio();
      }
    }
  };

  return (
    <div>
      <p> {data?.hits.hits[0]._source.title} </p>
      <p>{data?.hits.hits[0]._id}</p>
      <div>
        <button id="backward" onClick={backwardHandler}>
          Backward
        </button>
        <button onClick={playHandler} id="play-pause">
          Play/Pause
        </button>
        <button onClick={forwardHandler} id="forward">
          Forward
        </button>
      </div>
    </div>
  );
}
