import 'react-h5-audio-player/lib/styles.css';
import AudioPlayer from 'react-h5-audio-player';
// src/RadioPlayer.tsx
import { useContext } from 'react';
import { PlayerContext } from '../Contexts/playerContext';


interface RadioPlayerProps {
    streamUrl: string;
}

const RadioPlayer: React.FC<RadioPlayerProps> = ({ streamUrl }) => {
    const {station} = useContext(PlayerContext);

    console.log(streamUrl, 'playcomp')

    return (
        <div style={{width: '50%', margin: '100px auto 0px'}}>
            {station._id !== "" &&
             <div className="station">
                  <div className="station_title">{station?._source.title}</div>
                  <div>{station?._source.subtitle}</div>
              </div>
            }
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
