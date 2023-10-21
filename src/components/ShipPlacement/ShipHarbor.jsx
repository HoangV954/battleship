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
        const grabbedCell = axis.main === 'x' ? Math.ceil((e.clientX - shipLoc.left) / 30) : Math.ceil((e.clientY - shipLoc.top) / 30);

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
                                startX: ship.defaultX,
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