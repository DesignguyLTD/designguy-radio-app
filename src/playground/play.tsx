import 'react-h5-audio-player/lib/styles.css';

import AudioPlayer from 'react-h5-audio-player';
// src/RadioPlayer.tsx
import React from 'react';

interface RadioPlayerProps {
    streamUrl: string;
}

const RadioPlayer: React.FC<RadioPlayerProps> = ({ streamUrl }) => {

    return (
        <div style={{width: '50%', margin: '400px auto'}}>
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
