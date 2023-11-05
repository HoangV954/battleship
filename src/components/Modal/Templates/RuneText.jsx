
import PropTypes from 'prop-types';


export default function Rune({ text }) {

    return (
        <span className="rune">{text}</span>
    )
}

Rune.propTypes = {
    text: PropTypes.string.isRequired
}