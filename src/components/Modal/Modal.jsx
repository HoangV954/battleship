import { useEffect, useContext } from "react";
import { ModalContainer, Ending } from "./Templates/ModalTemplate";
import { winnerDialogue, loserDialogue, fallBack, persist, giveUp, pursuit } from "../../utils/gameData";
import Character from "./Character";
import Arrow from "./Arrow";
import GameContext from "../../hooks/GameContext";
import '../Modal/modal.scss';
import PropTypes from 'prop-types';
import ReactHowler from 'react-howler';
import imperiumInter from '../../assets/sound/for-the-emperor.mp3';
import chaosInter from '../../assets/sound/chaos-approaches.mp3';
import impEndSound from '../../assets/sound/victory-theme.mp3';
import chaosEndSound from '../../assets/sound/chaos-dom-theme.mp3';


export default function Modal({ setAxis }) {

    const { gameState, resetGame } = useContext(GameContext)

    useEffect(() => {

        // Scroll to the top of the modal when it renders
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <ModalContainer victory={gameState.playerVictory} goodend={gameState.imperialEnd} badend={gameState.chaosEnd}>
            {(!gameState.imperialEnd && !gameState.chaosEnd) && (
                <>
                    <ReactHowler src={gameState.playerVictory ? imperiumInter : chaosInter}
                        playing={true}
                        loop={true}
                        volume={0.4}>
                    </ReactHowler>
                    <div className="dialogue-container">
                        {gameState.playerVictory ?
                            (
                                winnerDialogue.map((char, idx) => {
                                    if (idx !== winnerDialogue.length - 1) {
                                        return (<Character key={char.key} char={char} index={idx} choice={false}></Character>)
                                    } else {
                                        return (<Character key={char.key} char={char} index={idx} choice={true} setAxis={setAxis}></Character>)
                                    }
                                })
                            ) :
                            (
                                loserDialogue.map((char, idx) => {
                                    if (idx !== loserDialogue.length - 1) {
                                        return (<Character key={char.key} char={char} index={idx} choice={false} setAxis={setAxis}></Character>)
                                    } else {
                                        return (<Character key={char.key} char={char} index={idx} choice={true}></Character>)
                                    }
                                })
                            )
                        }
                        {
                            (gameState.giveUp && gameState.playerVictory) &&
                            (
                                fallBack.map((char, idx) => (
                                    <Character key={char.key} char={char} index={idx} choice={false}></Character>
                                ))
                            )
                        }
                        {
                            (gameState.giveUp === false && gameState.playerVictory) &&
                            (
                                pursuit.map((char, idx) => (
                                    <Character key={char.key} char={char} index={idx} choice={false}></Character>
                                ))
                            )
                        }
                        {
                            (gameState.giveUp && !gameState.playerVictory) &&
                            (
                                giveUp.map((char, idx) => (
                                    <Character key={char.key} char={char} index={idx} choice={false}></Character>
                                ))
                            )
                        }
                        {
                            (gameState.giveUp === false && !gameState.playerVictory) &&
                            (
                                persist.map((char, idx) => (
                                    <Character key={char.key} char={char} index={idx} choice={false}></Character>
                                ))
                            )
                        }
                    </div>
                    <Arrow></Arrow>
                </>
            )}
            {
                (gameState.imperialEnd || gameState.chaosEnd) &&
                (
                    <Ending goodend={gameState.imperialEnd} badend={gameState.chaosEnd}>
                        <ReactHowler src={gameState.imperialEnd ? impEndSound : chaosEndSound}
                            playing={true}
                            loop={false}
                            volume={0.4}
                            onEnd={() => resetGame('hard')}
                        >
                        </ReactHowler>
                        <div className={gameState.imperialEnd ? 'good-end' : 'bad-end'}>{gameState.imperialEnd ? (<><span>Imperial</span><span>Victory</span></>) : (<><span>Chaos</span><span>Domination</span></>)}</div>
                    </Ending>
                )
            }
        </ModalContainer>
    )
}
Modal.propTypes = {
    setAxis: PropTypes.func
}