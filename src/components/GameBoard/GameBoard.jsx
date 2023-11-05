import './GameBoard.scss';
import { useContext } from 'react';
import PlayerBoard from './PlayerBoard';
import ComputerBoard from './ComputerBoard';
import PropTypes from 'prop-types';
import GameContext from '../../hooks/GameContext';
import Button from '../../utils/Button';
import { StyledGameContainer } from '../../utils/BoardTemplates';
import ShipHarbor from '../ShipPlacement/ShipHarbor';
import Logo from '../Logo/Logo';
import Announcement from '../Announcement/Announcement';
import Modal from '../Modal/Modal';
import { Fade } from "react-awesome-reveal";

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
        <>
            {(gameState.gameStarted || gameState.gameSetup) ? (<StyledGameContainer>
                <Logo />
                <Announcement />
                <div className="game-board">
                    <div className="player-wrapper">
                        <p>IMPERIUM FLEET</p>
                        <div className='player-board-container'>
                            <PlayerBoard name='player' size={30} axis={axis}></PlayerBoard>
                        </div>
                    </div>
                    {
                        gameState.gameStarted && (<div className={`computer-wrapper ${!gameState.gameSetup ? 'fadeIn' : 'fadeOut'}`}>
                            <p>CHAOS FORCE</p>
                            <div className="computer-board-container">
                                <ComputerBoard name='computer' size={30} axis={axis}></ComputerBoard>
                            </div>
                        </div>)
                    }
                    {
                        gameState.gameSetup && (
                            <div className={`harbor-wrapper ${!gameState.gameIntro ? 'fadeIn' : 'fadeOut'}`}>
                                <p>SPACE PORT</p>
                                <ShipHarbor axis={axis}></ShipHarbor>
                            </div>
                        )
                    }

                </div>
                <div className='footer-bar'>Footer
                    <Button name='axis-changer' onClick={onClick} textContent={`Current Axis: ${axis.main}`}></Button>
                </div>
            </StyledGameContainer>) : null
            }
            {
                gameState.playerVictory && (

                    <Modal victory={gameState.playerVictory}></Modal>
                )
            }
        </>
    )
}

GameBoard.propTypes = {
    axis: PropTypes.object,
    setAxis: PropTypes.func
}