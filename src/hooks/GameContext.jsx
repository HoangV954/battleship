import { createContext } from "react";
import useGame from "./useGame";
import PropTypes from 'prop-types';

const GameContext = createContext({});

export function GameContextProvider({ children }) {
    const { harbor, setHarbor, playerBoard, setPlayerBoard, computerBoard, setComputerBoard, shipPlacement, setShipPlacement, compShipPlacement, setCompShipPlacement, grabbedCell, setGrabbedCell, shipLength, setShipLength, gameState, gameDispatch, randomize, shipPlacementRandomize } = useGame();

    return <GameContext.Provider value={{ harbor, setHarbor, playerBoard, setPlayerBoard, computerBoard, setComputerBoard, shipPlacement, setShipPlacement, compShipPlacement, setCompShipPlacement, grabbedCell, setGrabbedCell, shipLength, setShipLength, gameState, gameDispatch, randomize, shipPlacementRandomize }}>
        {children}
    </GameContext.Provider>
}

GameContextProvider.propTypes = {
    children: PropTypes.node
}


export default GameContext;