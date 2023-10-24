import PropTypes from 'prop-types';
import { useContext, useEffect, useRef } from 'react';
import GameContext from '../../hooks/GameContext';
import { findNextCell } from '../../utils/gameHelper';
import { shipList } from '../../utils/gameData';
import { StyledBoard, LayerBoard } from "./BoardTemplates";

function ComputerBoard({ name, size }) {
    const { playerBoard, setPlayerBoard, computerBoard, setComputerBoard, compShipPlacement, randomize, shipPlacementRandomize, gameState, gameDispatch } = useContext(GameContext);

    const hitArrayRef = useRef(null);
    const sunkArrayRef = useRef(null);
    const missArrayRef = useRef(null);
    const prevSunkArrayRef = useRef(null);
    const curShotRef = useRef(null);


    const iniBoard = () => {
        const newCompBoard = shipPlacementRandomize();
        setComputerBoard(newCompBoard)
    }

    useEffect(() => {
        iniBoard();
        hitArrayRef.current = [];
        sunkArrayRef.current = [];
        prevSunkArrayRef.current = [];
        missArrayRef.current = [];
    }, [])

    useEffect(() => {
        if (gameState.playerHp === 0 || gameState.computerHp === 0) {
            gameDispatch({ type: 'GAME_ENDED' })
        }
    }, [gameState.playerHp, gameState.computerHp])

    const handleOnClick = (e) => {
        // ! Handle game loss/win
        if (gameState.gameEnded) {
            return null;
        }
        //* Player's target cell
        const targetClass = e.target.classList[0];
        const targetCellIndex = Number(targetClass.slice(7, targetClass.length));
        const clickedCell = computerBoard[targetCellIndex - 1];
        //* BOARD VISUALIZATION 
        setComputerBoard((compBoard) => {
            const newCompBoard = compBoard.map((cell) => {
                if (cell === clickedCell) {
                    return { ...cell, isHit: true };
                }
                return cell;
            });
            return newCompBoard;
        });
        //* Dispatching actions
        const shootAIAction = {
            type: 'SHOOT_AI',
            payload: { clickedCell }
        }

        gameDispatch(shootAIAction);
    }

    const handleAI = () => {
        //* Initial computer's target cell setup
        let availablePlayerCells = playerBoard.filter((cell) => cell.isHit === false);
        const randomCell = randomize(availablePlayerCells);
        if (!curShotRef.current) {
            curShotRef.current = randomCell;
        }
        const curShotValue = curShotRef.current;

        //Board visual + dispatch action
        setPlayerBoard((playerBoard) => {
            const newPlayerBoard = playerBoard.map((cell) => {
                if (cell === curShotValue) {
                    return { ...cell, isHit: true };
                }
                return cell;
            });
            return newPlayerBoard;
        });

        const shootPlayerAction = {
            type: 'SHOOT_PLAYER',
            payload: { curShotValue }
        }
        if (!gameState.gameEnded) {
            gameDispatch(shootPlayerAction);
        }
        //Setting hit, miss, sunk array and the next target
        if (curShotValue.isOccupied === true) {
            hitArrayRef.current.push(curShotValue);
        } else if (!curShotValue.isOccupied) {
            missArrayRef.current.push(curShotValue)
        }
        shipList.forEach((ship) => {
            const shipHitCells = hitArrayRef.current.filter((cell) => cell.ship === ship.type);
            if (shipHitCells.length === ship.hp) {
                sunkArrayRef.current.push(...shipHitCells);
                hitArrayRef.current = hitArrayRef.current.filter((cell) => cell.ship !== ship.type)
            }
        })
        availablePlayerCells = playerBoard.filter((cell) => {
            const diffFromHit = hitArrayRef.current.every(hitCell => hitCell.index !== cell.index);
            const diffFromSunk = sunkArrayRef.current.every(sunkCell => sunkCell.index !== cell.index);
            const diffFromMiss = missArrayRef.current.every(missCell => missCell.index !== cell.index);
            return diffFromHit && diffFromSunk && diffFromMiss
        });
        if (curShotValue.isOccupied === true) {// hit an occupied cell 
            if (prevSunkArrayRef.current.length === sunkArrayRef.current.length) {// damaged the ship but did not sink
                curShotRef.current = randomize(findNextCell(hitArrayRef.current, availablePlayerCells));
            }
            if (prevSunkArrayRef.current.length !== sunkArrayRef.current.length) {
                if (hitArrayRef.current.length > 0) {
                    //making sure there's still cell that is a hit but not yet sunk a ship
                    curShotRef.current = randomize(findNextCell(hitArrayRef.current, availablePlayerCells));
                }
                if (hitArrayRef.current.length === 0) {
                    curShotRef.current = randomize(availablePlayerCells);
                }
                //Reset prevSunkArray for comparison purpose
                prevSunkArrayRef.current = sunkArrayRef.current
            }

        }

        if (curShotValue.isOccupied === false) {// Miss an occupied cell, cant sink ship anyway so finding hit cell to locate next cells is the only possibility
            if (hitArrayRef.current.length > 0) {
                curShotRef.current = randomize(findNextCell(hitArrayRef.current, availablePlayerCells));
            }
            if (hitArrayRef.current.length === 0) {
                curShotRef.current = randomize(availablePlayerCells);
            }

        }
    }

    return (
        <>
            <p>{gameState.message}</p>
            <StyledBoard name={name} size={size}>
                {
                    computerBoard.map((square) => {
                        return (
                            <div className={`square-${square.index}
                            ${square.isOccupied ? 'occupied' : ''}
                            ${square.ship ? `type-${square.ship}` : ''}
                            ${square.isHit && !square.isOccupied ? 'miss' : ''}
                            ${square.isHit && square.isOccupied ? 'sunk' : ''}
                            `}
                                key={square.key}
                                data-x={square.x}
                                data-y={square.y}
                                onClick={gameState.gameStarted ? (e) => { handleOnClick(e); handleAI() } : null}
                            ></div>
                        )
                    })
                }
            </StyledBoard>
            <LayerBoard name={name} size={size}>
                {
                    compShipPlacement.map(
                        (ship) => {
                            if (ship !== undefined)
                                return ship.render({
                                    startX: ship.defaultX,
                                    startY: ship.defaultY,
                                    length: ship.length,
                                    axis: ship.axis,
                                    type: ship.type,
                                    draggable: false,
                                    key: ship.key
                                })
                        }
                    )
                }
            </LayerBoard>
        </>
    )
}


ComputerBoard.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    axis: PropTypes.object
}

export default ComputerBoard;