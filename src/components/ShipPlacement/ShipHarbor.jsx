import './ShipHarbor.scss';
import { useContext } from 'react';
import GameContext from '../../hooks/GameContext';
import PropTypes from 'prop-types';

const ShipHarbor = ({ axis }) => {
    const { harbor, setGrabbedCell, setShipLength } = useContext(GameContext)

    const handleDragStart = (e) => {
        e.dataTransfer.setData("text", e.target.id);
        e.dataTransfer.effectAllowed = "move";

        const ship = e.target;
        const shipLoc = ship.getBoundingClientRect();
        const cellSizeInRem = 3; // Size of each cell in rem
        const rootFontSizeInPx = 16; // Root font size in pixels
        const cellSizeInPx = cellSizeInRem * rootFontSizeInPx;
        const grabbedCell = axis.main === 'x' ? Math.ceil((e.clientX - shipLoc.left) / cellSizeInPx) : Math.ceil((e.clientY - shipLoc.top) / cellSizeInPx);

        setGrabbedCell(grabbedCell);

        harbor.forEach((ship) => {
            if (ship !== undefined && ship.type === e.target.id) {
                setShipLength(ship.length)
            }
        })
    }

    return (
        <div className="ship-harbor">
            {
                harbor.map(
                    (ship) => {
                        if (ship !== undefined)
                            return ship.render({
                                startX: axis.main === 'x' ? ship.defaultX : ship.subX,
                                startY: axis.main === 'x' ? ship.defaultY : ship.subY,
                                length: ship.length,
                                draggable: true,
                                type: ship.type,
                                axis: axis.main,
                                onDragStart: handleDragStart,
                                key: ship.key
                            })
                    }
                )
            }
        </div>
    )
}

ShipHarbor.propTypes = {
    axis: PropTypes.object
}

export default ShipHarbor