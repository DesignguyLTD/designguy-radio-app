import React, { useContext, useEffect, useRef } from "react";

import { radioContext } from "../Contexts/radioContext";

interface CustomRadioProps {
  streamUrl: string;
}

const CustomRadio: React.FC<CustomRadioProps> = ({ streamUrl }) => {
  const { station } = useContext(radioContext);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    console.log("useEffect running");
    console.log("streamUrl at start of useEffect:", streamUrl);

    if (audioRef.current) {
      const audioElement = audioRef.current;
      audioElement.src = streamUrl;
      console.log("Audio element:", audioElement);
      console.log(streamUrl)

      const handleCanPlay = () => {
        audioElement.play();
      };

      const handleError = (error: any) => {
        console.error("Error playing audio:", error);
      };

      audioElement.addEventListener("canplay", handleCanPlay);
      audioElement.addEventListener("error", handleError);

      audioElement.load();
      console.log("stremurl from my compnt", streamUrl);

      return () => {
        audioElement.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, [streamUrl]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      console.log("url ", streamUrl);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // const handleNext = () => {
  //   // Logic to set the next station
  //   const nextStation = getNextStation(); // Replace with actual logic
  //   setStation(nextStation);
  // };

  // const handlePrevious = () => {
  //   // Logic to set the previous station
  //   const previousStation = getPreviousStation(); // Replace with actual logic
  //   setStation(previousStation);
  // };

  return (
    <>
      <div>
        <h2>{station._source.title}</h2>
        <audio ref={audioRef} src={streamUrl} controls />
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button>Previous</button>
        <button>Next</button>
      </div>
    </>
  );
};

export default CustomRadio;
