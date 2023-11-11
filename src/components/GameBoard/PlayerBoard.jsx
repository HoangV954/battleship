import { useContext } from 'react';
import GameContext from '../../hooks/GameContext';
import { findShipIdx, getCells, getCellsCondition, resetHoverBoard } from "../../utils/gameHelper";
import PropTypes from 'prop-types';
import { StyledBoard, LayerBoard } from "../../utils/BoardTemplates";
import { shipList } from '../../utils/gameData';

function PlayerBoard({ name, size, axis }) {

    const { playerBoard, setPlayerBoard, shipPlacement, setShipPlacement, setHarbor, grabbedCell, shipLength } = useContext(GameContext);


    const handleDrop = (e) => {
        e.preventDefault();
        const mainAxis = axis.main;
        const dropId = e.dataTransfer.getData('text');
        const shipElement = document.getElementById(dropId);
        let shipIndex;

        if (shipElement === null) {
            return null;
        } else {
            shipIndex = findShipIdx(shipElement.id, shipList);
        }

        const { hoveredCellMainBoard, selectedCells } = getCells(grabbedCell, shipLength, e.target, playerBoard, mainAxis);

        if (selectedCells.some((cellObj) =>
            getCellsCondition(cellObj, hoveredCellMainBoard, mainAxis)
        )) {
            setPlayerBoard((playerBoard) =>
                resetHoverBoard(playerBoard)
            )
            return null;
        } else {
            setShipPlacement((shipPlacement) => {
                const updatedPlacement = [...shipPlacement]; // Create a copy of the array

                updatedPlacement[shipIndex] = { ...shipList[shipIndex] };
                // Make a deep copy of the object else it will back reference the object in shipList - will modify any state that used shipList as initial value
                if (mainAxis === 'x') {
                    updatedPlacement[shipIndex].defaultX = Number(e.target.dataset.x);// Update the ship's start point
                    updatedPlacement[shipIndex].defaultY = Number(e.target.dataset.y) - grabbedCell + 1;// Update the ship's end point
                } else {
                    updatedPlacement[shipIndex].axis = 'y';
                    updatedPlacement[shipIndex].defaultX = Number(e.target.dataset.x) - grabbedCell + 1;
                    updatedPlacement[shipIndex].defaultY = Number(e.target.dataset.y);
                }
                // Grid line modification +1 - different from grid cell index

                return updatedPlacement;
            });

            setHarbor((harbor) => {
                const newHarbor = [...harbor]
                newHarbor[shipIndex] = undefined

                return newHarbor
            })

            setPlayerBoard((playerBoard) => {
                const newPlayerBoard = [...playerBoard];
                newPlayerBoard.forEach((cell) => {
                    if (selectedCells.includes(cell)) {
                        cell.isOccupied = true;
                        cell.ship = shipElement.id;
                    }
                })

                return newPlayerBoard;
            })
        }
        setPlayerBoard((playerBoard) =>
            resetHoverBoard(playerBoard)
        )

    }

    const handleDragOver = (e) => {
        e.preventDefault();

        const mainAxis = axis.main;

        const { hoveredCellMainBoard, selectedCells, invalidCells } = getCells(grabbedCell, shipLength, e.target, playerBoard, mainAxis);

        if (selectedCells.some((cellObj) =>
            getCellsCondition(cellObj, hoveredCellMainBoard, mainAxis)
        )) {
            setPlayerBoard((playerBoard) => {
                const newPlayerBoard = [...playerBoard];
                newPlayerBoard.forEach((cell) => {
                    if (selectedCells.includes(cell)) {
                        cell.isHovered = true;
                        cell.isOutOfBound = true;
                    }
                    if (invalidCells.includes(cell)) {
                        cell.isHovered = false;
                    }
                })

                return newPlayerBoard;
            })
        } else {
            setPlayerBoard((playerBoard) => {
                const newPlayerBoard = [...playerBoard];
                newPlayerBoard.forEach((cell) => {
                    if (selectedCells.includes(cell)) {
                        cell.isHovered = true;
                        cell.isOutOfBound = false;
                    }
                })

                return newPlayerBoard;
            })
        }

    }



    const handleDragEnd = () => {
        setPlayerBoard((playerBoard) =>
            resetHoverBoard(playerBoard)
        )

    }

    return (
        <>
            <StyledBoard name={name} size={size}>
                {
                    playerBoard.map((square) => {
                        return (
                            <div className={`square-${square.index}
                            ${square.isHovered && !square.isOutOfBound ? 'hovered' : ''}
                            ${square.isHovered && square.isOutOfBound ? 'error' : ''}
                            ${square.isOccupied ? 'occupied' : ''}
                            ${square.ship ? `type-${square.ship}` : ''}
                            ${square.isHit && !square.isOccupied ? 'miss' : ''}
                            ${(square.isHit && square.isOccupied) ? 'sunk' : ''}`}

                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeaveCapture={handleDragEnd}

                                key={square.key}
                                data-x={square.x}
                                data-y={square.y}
                            >
                                {(square.isHit && !square.isOccupied) &&
                                    (<svg
                                        width={16}
                                        height={16}
                                        fill={'white'}
                                        xmlns='http://www.w3.org/2000/svg'

                                    >
                                        <circle cx={8} cy={8} r={8} />
                                    </svg>)
                                }
                                {(square.isHit && square.isOccupied) &&
                                    (<svg
                                        width={16}
                                        height={16}
                                        fill={'red'}
                                        xmlns='http://www.w3.org/2000/svg'

                                    >
                                        <circle cx={8} cy={8} r={8} />
                                    </svg>)
                                }
                            </div>
                        )
                    })
                }
            </StyledBoard>
            <LayerBoard name={name} size={size}>
                {
                    shipPlacement.map(
                        (ship) => {
                            if (ship !== undefined)
                                return ship.render({
                                    startX: ship.defaultX,
                                    startY: ship.defaultY,
                                    length: ship.length,
                                    axis: ship.axis,
                                    type: ship.type,
                                    draggable: false,
                                    display: !ship.isSunk ? 'player' : 'sunk',
                                    key: ship.key
                                })
                        }
                    )
                }
            </LayerBoard>

        </>
    )
}

PlayerBoard.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    axis: PropTypes.object
}

export default PlayerBoard;