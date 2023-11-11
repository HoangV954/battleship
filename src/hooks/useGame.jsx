import { useState, useEffect, useReducer } from "react";
import { shipList } from "../utils/gameData";
import { iniPlayerBoard, iniComputerBoard, generateBoard } from "../utils/gameHelper";


const gameIniState = {
    playerName: '',
    gameIntro: false,
    gameSetup: false,
    gameStarted: false,
    gameEnded: true,
    giveUp: null,
    playerVictory: false,
    imperialEnd: false,
    chaosEnd: false,
    playerHp: 17,
    computerHp: 17,
    playerInventory: [...shipList],
    computerInventory: [...shipList],
    message: ''
}


const gameReducer = (state, action) => {
    switch (action.type) {
        case 'SETUP_GAME': {
            const { inputVal } = action.payload;
            let message = state.message;
            message = `Greetings Admiral ${inputVal}, drag the ships to your desired strategic position`
            return {
                ...state,
                message: message,
                playerName: inputVal,
                gameIntro: false,
                gameSetup: true
            }
        }
        case 'START_GAME': {
            let message = state.message;
            message = `Multiple Chaos vessels located. Nova Cannon charged. Firing on command.`
            return {
                ...state,
                message: message,
                gameSetup: false,
                gameStarted: true
            }
        }

        case 'SHOOT_AI': {
            const { clickedCell } = action.payload;
            let hp = state.computerHp;
            let message = state.message;
            const updatedCompInventory = state.computerInventory.map((ship) => {
                if (ship.type === clickedCell.ship) {
                    const updatedShip = {
                        ...ship,
                        hp: ship.hp - 1
                    }
                    hp = hp - 1;
                    if (updatedShip.hp === 0) {
                        message = `You have destroyed enemy's ${ship.type}`;
                        return null
                    }
                    return updatedShip;
                }
                return ship
            })
            return {
                ...state,
                message: message,
                computerHp: hp,
                computerInventory: updatedCompInventory.filter((ship) => ship !== null)
            }
        }
        case 'SHOOT_PLAYER': {
            const { curShotValue } = action.payload;
            let hp = state.playerHp;
            let message = state.message;
            const updatedPlayerInventory = state.playerInventory.map((ship) => {
                if (ship.type === curShotValue.ship) {
                    const updatedShip = {
                        ...ship,
                        hp: ship.hp - 1
                    }
                    hp = hp - 1;
                    if (updatedShip.hp === 0) {
                        message = `Chaos army has destroyed your ${ship.type}`
                        return null
                    }
                    return updatedShip;
                }
                return ship
            })
            return {
                ...state,
                message: message,
                playerHp: hp,
                playerInventory: updatedPlayerInventory.filter((ship) => ship !== null)
            }
        }
        case 'GAME_ENDED':
            {
                let victory;

                if (state.playerHp !== 0) {
                    victory = true
                }
                else if (state.computerHp !== 0) {
                    victory = false
                }

                return {
                    ...state,
                    gameStarted: false,
                    gameEnded: true,
                    playerVictory: victory
                }
            }
        case 'PURSUIT': {
            return {
                ...state,
                giveUp: false,
            }
        }
        case 'GIVE_UP': {

            return {
                ...state,
                giveUp: true,
            }
        }

        case 'SET_ENDING': {
            let goodEnd;
            let badEnd

            if (state.playerVictory) {
                goodEnd = true;
                badEnd = false;
            } else {
                goodEnd = false;
                badEnd = true;
            }


            return {
                ...state,
                imperialEnd: goodEnd,
                chaosEnd: badEnd
            }
        }
        case 'SOFT_RESET': {
            let playerName = state.playerName;
            let message = `Greetings Admiral ${state.playerName}, drag the ships to your desired strategic position`

            return {
                ...gameIniState,
                message: message,
                playerName: playerName,
                gameSetup: true,
                gameIntro: false,
            }
        }
        case 'HARD_RESET':
            return {
                ...gameIniState,
                playerName: '',
                message: '',
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
    const [mute, setMute] = useState(false);
    const [sound, setSound] = useState(true)

    const resetGame = (resetType) => {
        setHarbor([...shipList]);
        const newPlayerBoard = generateBoard();
        const newCompBoard = generateBoard();
        setPlayerBoard(newPlayerBoard);
        setComputerBoard(newCompBoard);
        setShipPlacement([]);
        setCompShipPlacement([]);

        resetType === 'soft' ? gameDispatch({ type: 'SOFT_RESET' }) : gameDispatch({ type: 'HARD_RESET' });
    }

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

    return { harbor, setHarbor, playerBoard, setPlayerBoard, computerBoard, setComputerBoard, shipPlacement, setShipPlacement, compShipPlacement, setCompShipPlacement, grabbedCell, setGrabbedCell, shipLength, setShipLength, randomize, shipPlacementRandomize, gameState, gameDispatch, resetGame, sound, setSound, mute, setMute }
}

export default useGame;