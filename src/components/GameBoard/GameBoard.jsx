import './GameBoard.scss';
import { useContext } from 'react';
import PlayerBoard from './PlayerBoard';
import ComputerBoard from './ComputerBoard';
import PropTypes from 'prop-types';
import GameContext from '../../hooks/GameContext';
import Button from '../../utils/Button';
import { StyledGameContainer } from './BoardTemplates';
import Character from '../../utils/Character';
import ShipHarbor from '../ShipPlacement/ShipHarbor';

export default function GameBoard({ axis, setAxis }) {

    const { gameState } = useContext(GameContext);

    const onClick = () => {
        setAxis((axis) => {
            return {
                main: axis.sub,
                sub: axis.main
            }
        })
    }

    return (
        <StyledGameContainer>
            <div className='logo-bar'>LOGO HERE</div>
            <div className='text-bar'>TEXT HERE</div>
            <div className="game-board">
                <div className="player-wrapper">
                    <p>IMPERIUM FLEET</p>
                    <div className='player-board-container'>
                        <PlayerBoard name='player' size={30} axis={axis}></PlayerBoard>
                    </div>
                </div>
                {
                    gameState.gameStarted && (<div className="computer-wrapper">
                        <p>CHAOS FORCE</p>
                        <div className="computer-board-container">
                            <ComputerBoard name='computer' size={30} axis={axis}></ComputerBoard>
                        </div>
                    </div>)}
                {
                    gameState.gameSetup && (
                        <div className='harbor-wrapper'>
                            <p>SPACE PORT</p>
                            <ShipHarbor axis={axis}></ShipHarbor>
                        </div>
                    )
                }
            </div>
            <div className='footer-bar'>Footer
                <Button name='axis-changer' onClick={onClick} textContent={`Current Axis: ${axis.main}`}></Button>
            </div>
        </StyledGameContainer>
    )
}

GameBoard.propTypes = {
    axis: PropTypes.object,
    setAxis: PropTypes.func
}