import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import GameContext from '../../hooks/GameContext';
import { StyledBoard, LayerBoard } from "./BoardTemplates";

function ComputerBoard({ name, size }) {
    const { playerBoard, setPlayerBoard, computerBoard, setComputerBoard, compShipPlacement, randomize, shipPlacementRandomize, gameState, gameDispatch } = useContext(GameContext);

    const [nextShot, setNextShot] = useState(null);
    const [curFilteredShots, setCurFilteredShot] = useState([]);
    const [shotArray, setShotArray] = useState([]);


    const iniBoard = () => {
        const newCompBoard = shipPlacementRandomize();
        setComputerBoard(newCompBoard)
    }

    useEffect(() => {
        iniBoard()

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

        /* ------------------------------------------ */
        //* Player's target cell
        const targetClass = e.target.classList[0];
        const targetCellIndex = Number(targetClass.slice(7, targetClass.length));
        const clickedCell = computerBoard[targetCellIndex - 1];
        /* ------------------------------------------ */
        let prevPlayerInventory = gameState.playerInventory;
        let curShot;
        let availablePlayerCells;
        availablePlayerCells = playerBoard.filter((cell) => cell.isHit === false);
        const randomCell = randomize(availablePlayerCells);


        const shotFilter = (targetCell, availArr) => {
            let nextShotArr = [];
            if (targetCell && availArr.length !== 0) {

                for (let i = 0; i < availArr.length; i += 1) {
                    if (availArr[i].y === targetCell.y) {
                        if (availArr[i].x === targetCell.x + 1 || availArr[i].x === targetCell.x - 1) {
                            nextShotArr.push(availArr[i])
                        }
                    } else if (availArr[i].x === targetCell.x) {
                        if (availArr[i].y === targetCell.y + 1 || availArr[i].y === targetCell.y - 1) {
                            nextShotArr.push(availArr[i])
                        }
                    }

                }
            } else {
                console.log(`Fuck this ${targetCell}`)
            }
            return nextShotArr
        }

        //* Initial cell setup

        if (!nextShot) {
            curShot = randomCell;
        }

        /* ---------------------------------------------- */
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


        setPlayerBoard((playerBoard) => {
            const newPlayerBoard = playerBoard.map((cell) => {
                if (cell === curShot) {
                    return { ...cell, isHit: true };
                }
                return cell;
            });
            return newPlayerBoard;
        });

        /* --------------------------------------------- */
        //* Dispatching actions

        const shootAIAction = {
            type: 'SHOOT_AI',
            payload: { clickedCell }
        }
        const shootPlayerAction = {
            type: 'SHOOT_PLAYER',
            payload: { curShot }
        }
        gameDispatch(shootAIAction);
        if (!gameState.gameEnded) {
            gameDispatch(shootPlayerAction);
        }
        /* ---------------------------------------------- */
        //*Preparing the next shots for computer => player

        /* if (curShot.isOccupied === true) */
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
                                onClick={gameState.gameStarted ? handleOnClick : null}
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