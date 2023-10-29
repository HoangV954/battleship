import ShipContainer from "../ShipContainer";
import PropTypes from 'prop-types';


const Battleship = (props) => {
    const { startX, startY, length, draggable, onDragStart, axis } = props;


    return (
        <ShipContainer startX={startX}
            startY={startY}
            length={length}
            draggable={draggable}
            onDragStart={onDragStart}
            axis={axis}
            {...props} // Rest of the props since some might not be used by container
        >
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='100%'
                height='100%'
                viewBox={axis === 'x' ? '0 0 302 98' : '0 0 98 302'}
                fill='grey'
                preserveAspectRatio='none'
            >
                <path
                    transform={axis === 'y' ? 'rotate(90, 46, 46)' : ''}
                    d='M215 6.5c-.2 1.1-.2 2.3-.1 2.7 0 .4.3 2.5.7 4.7.6 3.4.4 4.1-1 4.1-1.3 0-1.6.5-1.1 2 .4 1.4.2 2-.8 2s-1.5 1.1-1.5 3.2c-.1 1.8-.9 5.8-2 8.8-1.8 5.2-2.1 5.5-5.5 5.8-2.8.2-3.6.8-3.9 2.5-.2 1.2-1 2.3-1.9 2.5-1.2.2-2.4-2.6-5.5-13.3L188.5 18h-4.2c-6.1 0-6.9 1.4-7.8 12.7-1 14.8-.8 14.3-7 14.3-4.8 0-5.4.3-5.8 2.2-.4 2-.4 1.9-.6-.5-.1-2-.6-2.7-2.1-2.7-1.4 0-2-.7-2-2.1 0-1.5-.5-2-2.2-1.7-1.6.2-2.2.9-2 2 .2 1-.2 1.8-.8 1.8-.5 0-1 1.1-1 2.5 0 2.4-.3 2.5-5.4 2.5-4.9 0-5.5.2-5.8 2.2-.2 1.5-1.1 2.4-2.5 2.6-1.5.2-2.3 1-2.3 2.3 0 1.8-.9 1.9-23.2 1.9-12.8 0-23.9-.4-24.7-.9-2.2-1.4 2-4.7 7.4-5.7 5-.9 6.9-2.9 4-4-.9-.4-2.1 0-2.8 1-.9 1.3-2.4 1.7-5.7 1.4-6.5-.5-6.4-2.8.2-2.9 8.1-.2 2-1.7-6.7-1.7-8.4 0-14.9 1.5-7.2 1.7 5.4.1 6 1.2 1.7 2.8-1.9.7-3 1.8-3 3.1 0 2.1 2.2 4.5 3.4 3.7.3-.3.2 0-.3.6-.5.7-5 .9-12.7.6-6.6-.3-13.5-.6-15.4-.6-2.7-.1-3.1-.3-2-1.1.8-.5 2.7-1 4.2-1 1.7 0 3.1-.8 3.8-2 .8-1.5 2.1-2 5.5-2 4.6 0 6.5-1.4 4.6-3.3-.9-.9-1.6-.8-3.1.1-2.4 1.4-11 1.6-11 .2 0-.6 2-1 4.5-1s4.5-.5 4.5-1c0-1.3-20.7-1.3-21.5-.1-.3.6 1.6 1.1 4.2 1.3 4.7.3 4.7.4 2 1.6-1.5.6-3 1.9-3.4 2.8-.7 2 1 5 2.7 4.6.6-.1.9.2.5.8-.3.5-3.7 1-7.6 1H33v2.9c0 2.4.5 3 2.5 3.3 1.4.2 2.5.7 2.5 1.3 0 .6-5.7 1.1-14.5 1.3-8 .1-14.5.6-14.5 1 0 .5.7 3.1 1.5 6 1.9 6.3 5.7 10.9 11 13.3 3.8 1.8 9.9 1.9 131 1.9h127l1.7-6.4c1.7-6.5 8.3-21.1 9.9-22.2 2.9-1.8-.5-2.4-13-2.4-11.7 0-14-.2-14.5-1.6-.9-2.4-.9-2.4 4.2-2.5l4.7-.2-6-.8c-10.6-1.6-13-1.7-15.2-1.2-2.2.5-3.3 3.3-1.3 3.3.6 0 1 .7 1 1.5 0 1.2-1.3 1.5-5.5 1.5H240v-5.3c0-7.3-1-12.7-2.4-12.7-.7 0-1-1.4-.8-4l.4-4h-4.6c-4.7 0-8.1 1.3-10.2 3.9-.9 1.2-1.3.5-1.9-3.6-.4-2.9-.4-6.1 0-7.2.4-1.4-.1-3.1-1.4-5-1.3-1.8-2.1-4.6-2.2-7.3 0-2.3-.4-5.2-.9-6.3l-.9-2-.1 2z'
                />
            </svg>
        </ShipContainer>
    )
}

Battleship.propTypes = {
    startX: PropTypes.number.isRequired,
    startY: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    draggable: PropTypes.bool.isRequired,
    onDragStart: PropTypes.func,
    axis: PropTypes.string.isRequired
}

export default Battleship;