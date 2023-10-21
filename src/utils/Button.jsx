import PropTypes from 'prop-types';

export default function Button({ name, onClick, textContent }) {
    return (
        <button className={name} onClick={onClick}>{textContent}</button>
    )
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    textContent: PropTypes.string.isRequired
}