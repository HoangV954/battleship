import PropTypes from 'prop-types';
import btnHover from '../assets/sound/metal-slam.mp3';
import useSound from 'use-sound';

export default function Button({ name, onClick, textContent }) {
    const [playBtnHover] = useSound(btnHover, { volume: 0.5 })
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