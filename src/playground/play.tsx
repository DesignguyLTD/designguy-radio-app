import 'react-h5-audio-player/lib/styles.css';
import AudioPlayer from 'react-h5-audio-player';
// src/RadioPlayer.tsx
import React, { useContext } from 'react';
import { PlayerContext } from '../Contexts/playerContext';


interface RadioPlayerProps {
    streamUrl: string;
}

const RadioPlayer: React.FC<RadioPlayerProps> = ({ streamUrl }) => {
    const {station} = useContext(PlayerContext);

    return (
        <div style={{width: '50%', margin: '300px auto 0px'}}>
             <div>
                  <div>{station?._source.title}</div>
                  <div>{station?._source.subtitle}</div>
                </div>
            <AudioPlayer
                autoPlay
                src={streamUrl}
                onPlay={e => console.log("onPlay")}
                // other props here
            />
        </div>
    );
};

export default RadioPlayer;
