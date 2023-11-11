import './GameBoard.scss';
import { useContext, useEffect } from 'react';
import PlayerBoard from './PlayerBoard';
import ComputerBoard from './ComputerBoard';
import PropTypes from 'prop-types';
import GameContext from '../../hooks/GameContext';
import Button from '../../utils/Button';
import { StyledGameContainer } from '../../utils/BoardTemplates';
import ShipHarbor from '../ShipPlacement/ShipHarbor';
import Logo from '../Logo/Logo';
/* import Announcement from '../Announcement/Announcement'; */
/* import Modal from '../Modal/Modal'; */
/* import Intro from '../Intro/Intro'; */
import Audio from '../Audio/Audio';
import { AnimatePresence, motion } from 'framer-motion';
import useSound from 'use-sound';
import ReactHowler from 'react-howler';
import mainTheme from '../../assets/sound/main-theme.mp3';
import announcerSound from '../../assets/sound/announcement.mp3';
import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';
import { Suspense } from "react";
import { lazyWithPreload } from "react-lazy-with-preload";

const Intro = lazyWithPreload(() => import("../Intro/Intro"));
const Modal = lazyWithPreload(() => import("../Modal/Modal"));
const Announcement = lazyWithPreload(() => import("../Announcement/Announcement"));


export default function GameBoard({ axis, setAxis }) {

    const { gameState, sound } = useContext(GameContext);
    const [playAnnounce] = useSound(announcerSound, { volume: sound ? 0.5 : 0 });

    useEffect(() => {
        playAnnounce();
    }, [gameState.message])

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
            <AnimatePresence mode='wait'>
                {
                    gameState.gameIntro &&
                    (<motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        key="intro">
                        <Audio></Audio>
                        <Suspense fallback={<Loading />}>
                            <Intro></Intro>
                        </Suspense>
                    </motion.div>)
                }
                {(gameState.gameStarted || gameState.gameSetup) && (<motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    key="game">
                    <Audio></Audio>
                    <StyledGameContainer>
                        <ReactHowler
                            src={mainTheme}
                            playing={true}
                            volume={sound ? 0.7 : 0}
                            loop={true}
                        />
                        <Logo />
                        <Suspense fallback={<Loading />}>
                            <Announcement />
                        </Suspense>
                        {gameState.gameSetup && <motion.div
                            className="axis-changer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 3 }}
                            key={'axis-changer'}>
                            <Button name='axis__active' onClick={onClick} textContent={`Current Axis: ${axis.main}`}>
                            </Button>
                        </motion.div>}
                        <div className="game-board">
                            <div className="player-wrapper">
                                <p>IMPERIUM FLEET</p>
                                <div className='player-board-container'>
                                    <PlayerBoard name='player' size={30} axis={axis}></PlayerBoard>
                                </div>
                            </div>
                            <AnimatePresence mode='wait'>
                                {
                                    gameState.gameStarted &&
                                    (<motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 3 }}
                                        className='computer-wrapper'
                                        key="computer">
                                        <p>CHAOS FORCE</p>
                                        <div className="computer-board-container">
                                            <ComputerBoard name='computer' size={30} axis={axis}></ComputerBoard>
                                        </div>
                                    </motion.div>)
                                }
                                {
                                    gameState.gameSetup && (
                                        <motion.div className='harbor-wrapper'
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 3 }}
                                            key={'harbor'}>
                                            <p>SPACE WARP</p>
                                            <ShipHarbor axis={axis}></ShipHarbor>
                                        </motion.div>
                                    )
                                }
                            </AnimatePresence>
                        </div>
                        <Footer></Footer>
                    </StyledGameContainer>
                </motion.div>)
                }
                {
                    gameState.gameEnded && (
                        <motion.div
                            className="modal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 3 }}>
                            <Suspense fallback={<Loading />}>
                                <Modal setAxis={setAxis}></Modal>
                            </Suspense>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    )
}

GameBoard.propTypes = {
    axis: PropTypes.object,
    setAxis: PropTypes.func
}