import './GameBoard.scss';
import { useContext } from 'react';
import PlayerBoard from './PlayerBoard';
import ComputerBoard from './ComputerBoard';
import PropTypes from 'prop-types';
import GameContext from '../../hooks/GameContext';

export default function GameBoard({ axis }) {


    return (
        <div className="game-board">
            <div className='player-board-container'>
                <PlayerBoard name='player' size={300} axis={axis}></PlayerBoard>
            </div>
            <div className="computer-board-container">
                <ComputerBoard name='computer' size={300} axis={axis}></ComputerBoard>
            </div>
        </div>
    )
}

GameBoard.propTypes = {
    axis: PropTypes.object
}