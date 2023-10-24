import { useState, useEffect, useReducer } from "react";
import { shipList } from "../utils/gameData";
import { iniPlayerBoard, iniComputerBoard } from "../utils/gameHelper";


const gameIniState = {
    playerName: 'Hoang',
    gameStarted: false,
    gameEnded: false,
    currentTurn: 'player',
    playerHp: 12,
    computerHp: 12,
    playerInventory: [...shipList],
    computerInventory: [...shipList],
    message: ''
}

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'START_GAME':
            return {
                ...state,
                gameStarted: true
            }
        case 'SHOOT_AI': {
            const { clickedCell } = action.payload;
            let hp = state.computerHp;
            const updatedCompInventory = state.computerInventory.map((ship) => {
                if (ship.type === clickedCell.ship) {
                    const updatedShip = {
                        ...ship,
                        hp: ship.hp - 1
                    }
                    hp = hp - 1;
                    if (updatedShip.hp === 0) {
                        console.log(`You have destroyed the enemy's ${ship.type}`)
                        return null
                    }
                    return updatedShip;
                }
                return ship
            })
            return {
                ...state,
                computerHp: hp,
                computerInventory: updatedCompInventory.filter((ship) => ship !== null)
            }
        }
        case 'SHOOT_PLAYER': {
            const { curShotValue } = action.payload;
            let hp = state.playerHp;
            const updatedPlayerInventory = state.playerInventory.map((ship) => {
                if (ship.type === curShotValue.ship) {
                    const updatedShip = {
                        ...ship,
                        hp: ship.hp - 1
                    }
                    hp = hp - 1;
                    if (updatedShip.hp === 0) {
                        console.log(`Hitler's army destroyed your ${ship.type}`)
                        return null
                    }
                    return updatedShip;
                }
                return ship
            })
            return {
                ...state,
                playerHp: hp,
                playerInventory: updatedPlayerInventory.filter((ship) => ship !== null)
            }
        }
        case 'GAME_ENDED':
            {
                let message;
                let winner;
                if (state.playerHp !== 0) {
                    winner = state.playerName;
                }
                else if (state.computerHp !== 0) {
                    winner = 'Hitler'
                }
                message = `Congrats ${winner}`
                console.log(state.message)
                return {
                    ...state,
                    gameStarted: false,
                    gameEnded: true,
                    message: message
                }
            }
    }
}
function useGame() {

    const [harbor, setHarbor] = useState([...shipList]);
    const [playerBoard, setPlayerBoard] = useState(iniPlayerBoard);
    const [computerBoard, setComputerBoard] = useState(iniComputerBoard);
    const [shipPlacement, setShipPlacement] = useState([]);
    const [compShipPlacement, setCompShipPlacement] = useState([]);
    const [grabbedCell, setGrabbedCell] = useState(0);
    const [shipLength, setShipLength] = useState(0);
    const [gameState, gameDispatch] = useReducer(gameReducer, gameIniState);

    useEffect(() => {
        if (harbor.every((ship) => ship == undefined)) {
            gameDispatch({ type: 'START_GAME' })
        }

    }, [harbor])

    const randomize = (arr) => {
        const randomArrIndex = Math.floor(Math.random() * arr.length)
        return arr[randomArrIndex];
    }


    const shipPlacementRandomize = () => {
        const compShips = [...shipList];
        let cellsToAudit = [];
        let groupValidCells = [];
        const chosenAxis = [];
        const axisArr = ['x', 'y'];
        let newCompBoard = [...computerBoard];

        compShips.forEach((ship, idx) => {
            let axis = randomize(axisArr);
            let pivotCell = randomize(computerBoard);
            let validPivotCell = null;
            const validCells = [];

            while (!validPivotCell) {
                validCells.length = 0; // Clear validCells before each iteration
                chosenAxis[idx] = axis;
                if (axis === 'x') {
                    for (let i = pivotCell.index; i < pivotCell.index + ship.length; i++) {
                        if (computerBoard[i - 1]) {
                            validCells.push(computerBoard[i - 1]);
                        }
                    }
                }

                if (axis === 'y') {
                    for (let i = pivotCell.index; i < pivotCell.index + ship.length * 10; i += 10) {
                        if (computerBoard[i - 1]) {
                            validCells.push(computerBoard[i - 1]);
                        }
                    }
                }

                // Check if every element satisfied conditions: not out of bound, not repeating between groups, maintain the axis and available space for ship w full length
                if (validCells.every(cell => cell !== undefined && !cellsToAudit.includes(cell) && cell[axis] === validCells[0][axis]) && validCells.length === ship.length) {
                    validPivotCell = true; // All elements sufficed, exit the loop
                } else {
                    // If any condition is not satisfied, randomize again
                    pivotCell = randomize(computerBoard);
                    axis = randomize(axisArr)
                }
            }
            cellsToAudit = [...cellsToAudit, ...validCells];
            groupValidCells = [...groupValidCells, [...validCells]];

            setCompShipPlacement((compShipPlacement) => {
                const updatedPlacement = [...compShipPlacement];
                updatedPlacement[idx] = { ...ship }
                const shipCoords = groupValidCells[idx][0];

                if (chosenAxis[idx] === 'x') {
                    /* Making sure new ship placement is aligned w the pivot cell's orientation */
                    updatedPlacement[idx].defaultX = shipCoords.x;
                    updatedPlacement[idx].defaultY = shipCoords.y;
                }
                if (chosenAxis[idx] === 'y') {
                    updatedPlacement[idx].axis = 'y';
                    updatedPlacement[idx].defaultX = shipCoords.x;
                    updatedPlacement[idx].defaultY = shipCoords.y;
                }

                return updatedPlacement;
            })


            newCompBoard = newCompBoard.map(cell => {
                if (groupValidCells[idx].includes(cell)) {
                    return {
                        ...cell,
                        isOccupied: true,
                        ship: ship.type
                    };
                }
                return cell;
            });


        })

        return newCompBoard
    }

    return { harbor, setHarbor, playerBoard, setPlayerBoard, computerBoard, setComputerBoard, shipPlacement, setShipPlacement, compShipPlacement, setCompShipPlacement, grabbedCell, setGrabbedCell, shipLength, setShipLength, randomize, shipPlacementRandomize, gameState, gameDispatch }
}

export default useGame;