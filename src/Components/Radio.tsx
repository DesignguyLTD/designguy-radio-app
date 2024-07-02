import "react-h5-audio-player/lib/styles.css";

import { useEffect, useState } from "react";

import AudioPlayer from "react-h5-audio-player";
import { Response } from "../Contexts/Types";
import { dummy } from "./Dummy";

export default function Radio() {
  let BASEURL = "https://radio.garden/api/ara/content/listen/";

  const [data, setData] = useState<Response | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentRadio, setCurrentRadio] = useState<number>(0);
  const [radioLinks, setRadioLinks] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = dummy as Response;
        console.log("Fetched data:", response);
        setData(response);
        const links = response.hits.hits
          .map((hit) => {
            console.log("Processing hit:", hit);
            const stream = hit._source.stream;
            const url = hit._source.url;
            const id = url.split("/").pop(); // Extract the ID from the URL
            const fullUrl = stream ? `${BASEURL}${id}/channel.mp3` : null; // Construct the new URL
            console.log("Base URL:", BASEURL);
            console.log("Stream URL:", url);
            console.log("ID:", id);
            console.log("Full URL:", fullUrl);
            return fullUrl;
          })
          .filter((url): url is string => url !== null);

        console.log("Generated links:", links);
        setRadioLinks(links);
        if (links.length > 0) {
          setCurrentRadio(0); // Set the initial radio station
        }
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [BASEURL]);

  if (loading) {
    return <> Loading...</>;
  }

  if (error) {
    return <> Error: {error}</>;
  }
  const currentUrl = radioLinks[currentRadio];

  const forwardHandler = () => {
    if (currentRadio < radioLinks.length - 1) {
      setCurrentRadio(currentRadio + 1);
    }
  };

  const backwardHandler = () => {
    if (currentRadio > 0) {
      setCurrentRadio(currentRadio - 1);
    }
  };

  return (
    <div>
      <p> {data?.hits.hits[currentRadio]._source.title} </p>
      <div>
        <button
          id="backward"
          onClick={backwardHandler}
          disabled={currentRadio === 0}>
          Backward
        </button>
        <button
          onClick={forwardHandler}
          id="forward"
          disabled={currentRadio === radioLinks.length - 1}>
          Forward
        </button>
      </div>
      {currentUrl && (
        <AudioPlayer
          autoPlay
          src={currentUrl}
          onPlay={(e) => console.log("Playing")}
          onError={(e) => {
            console.error("Error playing audio", e);
            setError("Failed to load audio");
          }}
        />
      )}
    </div>
  );
}
