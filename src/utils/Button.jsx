import PropTypes from 'prop-types';
import btnHover from '../assets/sound/metal-slam.mp3';
import useSound from 'use-sound';
import { useContext } from 'react';
import GameContext from '../hooks/GameContext';

export default function Button({ name, onClick, textContent }) {
    const { sound } = useContext(GameContext);
    const [playBtnHover] = useSound(btnHover, { volume: sound ? 0.4 : 0 })
    const handleMouseEnter = () => {
        playBtnHover();
    }
    return (
        <button className={name} onClick={onClick} onMouseEnter={handleMouseEnter}>{textContent}</button>
    )
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    textContent: PropTypes.string.isRequired
}