import PropTypes from 'prop-types';
import { useContext, useEffect, useRef } from 'react';
import GameContext from '../../hooks/GameContext';
import { findNextCell } from '../../utils/gameHelper';
import { shipList } from '../../utils/gameData';
import { StyledBoard, LayerBoard } from "../../utils/BoardTemplates";
import useSound from 'use-sound';
import lazer from '../../assets/sound/lazer-gun2.mp3';
import explo from '../../assets/sound/explosion.mp3';

function ComputerBoard({ name, size }) {
    const { playerBoard, setPlayerBoard, setShipPlacement, computerBoard, setComputerBoard, compShipPlacement, setCompShipPlacement, randomize, shipPlacementRandomize, gameState, gameDispatch, sound } = useContext(GameContext);

    const [playShoot] = useSound(lazer, { volume: sound ? 0.3 : 0 });
    const [playHit] = useSound(explo, { volume: sound ? 0.5 : 0 })

    const playerHitArrayRef = useRef(null);
    const hitArrayRef = useRef(null);
    const sunkArrayRef = useRef(null);
    const missArrayRef = useRef(null);
    const prevSunkArrayRef = useRef(null);
    const curShotRef = useRef(null);


    const iniBoard = () => {
        if (compShipPlacement.length === 0) {
            const newCompBoard = shipPlacementRandomize();
            setComputerBoard(newCompBoard)
        }
    }

    useEffect(() => {
        iniBoard();
        playerHitArrayRef.current = [];
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
        e.stopPropagation();
        // ! Handle game loss/win
        if (gameState.gameEnded) {
            return null;
        }
        //* Player's target cell
        const targetClass = e.target.classList[0];
        const targetCellIndex = Number(targetClass.slice(7, targetClass.length));
        const clickedCell = computerBoard[targetCellIndex - 1];

        if (clickedCell.isHit) {
            return
        }

        if (clickedCell.isOccupied === true) {
            playerHitArrayRef.current.push(clickedCell);
            playHit()
        } else {
            playShoot()
        }
        shipList.forEach((ship) => {
            const shipHitCells = playerHitArrayRef.current.filter((cell) => cell.ship === ship.type);
            if (shipHitCells.length === ship.hp) {
                playerHitArrayRef.current = playerHitArrayRef.current.filter((cell) => cell.ship !== ship.type);
                setCompShipPlacement((ships) => {
                    return ships.map((newShip) => {
                        if (newShip.type === ship.type) {
                            return { ...newShip, isSunk: true };
                        }
                        return newShip;
                    })
                })
            }
        })
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
        if (!clickedCell.isHit) {
            handleAI()
        }
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
            playHit()
            hitArrayRef.current.push(curShotValue);
        } else if (!curShotValue.isOccupied) {
            missArrayRef.current.push(curShotValue)
            playShoot()
        }
        shipList.forEach((ship) => {
            const shipHitCells = hitArrayRef.current.filter((cell) => cell.ship === ship.type);
            if (shipHitCells.length === ship.hp) {
                sunkArrayRef.current.push(...shipHitCells);
                hitArrayRef.current = hitArrayRef.current.filter((cell) => cell.ship !== ship.type);
                setShipPlacement((ships) => {
                    return ships.map((newShip) => {
                        if (newShip.type === ship.type) {
                            return { ...newShip, isSunk: true };
                        }
                        return newShip;
                    })
                })
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
                                onClick={gameState.gameStarted ? (e) => {
                                    handleOnClick(e);
                                } : null}
                            >
                                {(square.isHit && !square.isOccupied) &&
                                    (<svg
                                        width={16}
                                        height={16}
                                        fill={'white'}
                                        xmlns='http://www.w3.org/2000/svg'

                                    >
                                        <circle cx={8} cy={8} r={8} onClick={(e) => e.stopPropagation()} />
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
                                    display: !ship.isSunk ? 'computer' : 'sunk',
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