import { useContext } from "react";
import GameContext from "../../hooks/GameContext";
import { GoMute, GoUnmute } from 'react-icons/go';
import './audio.scss';

export default function Audio() {
    const { sound, setSound, mute, setMute } = useContext(GameContext);

    const handleClick = () => {
        setSound(!sound);
        setMute(!mute)
    }
    return (

        <div className="audio__wrapper" onClick={handleClick}>
            {mute ? <GoMute /> : <GoUnmute />}
        </div>
    )
}