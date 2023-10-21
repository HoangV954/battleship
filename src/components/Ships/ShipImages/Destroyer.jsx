import ShipContainer from "../ShipContainer";
import PropTypes from 'prop-types';

const Destroyer = (props) => {
    const { startX, startY, length, draggable, onDragStart, axis } = props;

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
                viewBox={axis === 'x' ? '0 0 153 60' : '0 0 55 153'}
                fill='grey'
                preserveAspectRatio='none'
            >
                <path
                    transform={axis === 'y' ? 'rotate(90, 30, 30)' : ''}
                    d='M53.6 20.4c-.5 2-1.3 2.5-4.4 2.8l-3.7.3-1 9.2c-.5 5-1.3 9.5-1.7 9.8-.4.4-2.5.4-4.7 0-3.9-.6-4.1-.9-4.1-4.1 0-2.8-.4-3.5-2.6-4-1.4-.4-3-.2-3.7.5-.6.6-2.5 1.1-4.2 1.2l-3 .1 3.3.9c1.9.6 3.2 1.6 3.2 2.6 0 1.4-1.2 1.5-10.5.9-5.8-.4-10.5-.5-10.5-.2s2.8 4.1 6.2 8.6l6.1 8h58.2c32.1 0 59.7-.3 61.4-.6 2.7-.6 3.1-1.1 3.1-3.8 0-2.6.5-3.4 2.7-4.2 2.5-.9 2.6-1 .9-2.6-1.1-1.2-3.3-1.8-6.2-1.8-4.2 0-5.9-1.2-3.1-2.3.6-.3.3-.6-.8-.7-1.7-.2-1.6-.3.5-.9 2.1-.7 1.7-.9-2.7-1.5-6.1-.9-7.3-.4-7.3 3 0 2.3-.2 2.4-7.5 2.4s-7.5-.1-7.5-2.5c0-2 .5-2.5 2.6-2.5 4.6 0 2-2.5-2.9-2.8-4.4-.3-4.7-.5-4.7-3.1 0-1.7-.7-3.1-1.6-3.5-2.5-1-6.2-.7-7 .5-.3.6-1.9.9-3.5.7-1.5-.3-2.6-.1-2.3.4.3.4 1.3.8 2.2.9 1.4 0 1.3.2-.3.9-1.7.7-1.7.9-.2.9.9.1 1.7.6 1.7 1.1 0 .7-2.2 1-5.7.8l-5.8-.3-.7-4.4c-.4-2.4-.9-4.5-1.1-4.7-.1-.2-2.2-.4-4.6-.6l-4.3-.3-1.7 5.3c-.9 3-2 5.3-2.5 5.3s-2-3.7-3.3-8.2c-1.3-4.5-2.6-8.6-2.9-9.1-.3-.4-2-.8-3.9-.8-2.6 0-3.4.5-3.9 2.4z'
                />
            </svg>
        </ShipContainer>
    )
}

Destroyer.propTypes = {
    startX: PropTypes.number.isRequired,
    startY: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    draggable: PropTypes.bool.isRequired,
    onDragStart: PropTypes.func,
    axis: PropTypes.string.isRequired
}


export default Destroyer;