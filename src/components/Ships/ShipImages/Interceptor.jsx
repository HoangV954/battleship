import ShipContainer from "../ShipContainer";
import PropTypes from 'prop-types';

const Interceptor = (props) => {
    const { startX, startY, length, draggable, onDragStart, axis, display } = props;

    const getFillCColor = (display) => {
        switch (display) {
            case 'player':
                return 'rgb(242,222,185)';
            case 'computer':
                return 'transparent';
            case 'sunk':
                return 'red'
        }
    }

    return (
        <ShipContainer startX={startX}
            startY={startY}
            length={length}
            draggable={draggable}
            onDragStart={onDragStart}
            axis={axis}
            {...props}
        >
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='100%'
                height='100%'
                viewBox={axis === 'x' ? '17 0 270 65' : '29 17 60 270'}
                fill={getFillCColor(display)}
                preserveAspectRatio='none'
            >
                <path
                    transform={axis === 'y' ? 'rotate(90, 48, 48)' : ''}
                    d='M147.3 20.7l.2 4.8-5.1-.3c-6.1-.4-6.9.4-7.8 7.8-.4 3-.9 7-1.2 8.7l-.6 3.3h-11.9c-7.4 0-12-.4-12.5-1.1-.4-.7-2.2-.9-4.8-.5-2.2.3-4.9.6-5.8.5-2.7-.1-10.6 0-12.5.1-1 0-3.3-.2-5.1-.6-1.9-.4-4.3-.2-5.5.4-1.2.6-4.8 1.3-8 1.6-7.7.6-13.8 4.2-16.5 9.7-1.2 2.3-1.9 4.6-1.6 5.1.3.4 49.8.8 110.1.8h109.5l-.6-2.7c-.5-1.7-.3-2.9.6-3.5 1.1-.6 1-1-.1-1.7-.9-.6-1.1-1.8-.7-3.5.6-2.5.5-2.6-3.9-2.6H259V30h-17.9l-1.5 5.2c-.8 2.9-2.1 7.4-2.8 10-1.3 5.2-1.7 5.4-9 4.2-2.8-.5-3.8-1.1-3.8-2.5 0-1.6-.8-1.9-5.1-1.9-3.5 0-5.5.5-6.3 1.5-1 1.4-2.4 1.4-10.1.6-5-.5-15.4-1.3-23.2-1.6l-14.2-.7-6.2-9.4c-4.1-6.3-6.8-9.4-8-9.4-1.6 0-1.9-.8-1.9-5 0-2.8-.4-5-1-5-.5 0-.9 2.1-.7 4.7z'
                />
            </svg>
        </ShipContainer>
    )
}

Interceptor.propTypes = {
    startX: PropTypes.number.isRequired,
    startY: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    draggable: PropTypes.bool.isRequired,
    display: PropTypes.string.isRequired,
    onDragStart: PropTypes.func,
    axis: PropTypes.string.isRequired
}

export default Interceptor;