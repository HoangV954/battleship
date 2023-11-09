import { CharacterContainer, TextBox, NamePlate } from './Templates/ModalTemplate';
import PropTypes from 'prop-types';
import Typewriter from 'typewriter-effect';
import { RandomReveal } from "react-random-reveal";
import { useContext } from 'react';
import GameContext from '../../hooks/GameContext';
import Rune from './Templates/RuneText';
import Button from '../../utils/Button';
import useSound from 'use-sound';
import giveUp from '../../assets/sound/button-deny.mp3';
import evilLaugh from '../../assets/sound/evil-laugh.mp3';




export default function Character({ char, index, choice, setAxis }) {

    const { gameState, gameDispatch, resetGame } = useContext(GameContext);
    const [playGiveUp] = useSound(giveUp, { volume: 0.4 })
    const [playLaugh] = useSound(evilLaugh, { volume: 0.3 })

    const handleGiveUp = () => {
        playGiveUp();

        gameDispatch({ type: 'GIVE_UP' })
        setTimeout(() => {

            gameDispatch({ type: 'SET_ENDING' })
            if (!gameState.playerVictory) {
                playLaugh();
            }
        }, 8000)
    }

    const handleReset = (resetType) => {
        gameDispatch({ type: 'PURSUIT' })
        setTimeout(() => {
            setAxis(() => {
                return {
                    main: 'x',
                    sub: 'y'
                }
            })
            resetGame(resetType);
        }, 8000)
    }


    return (
        <>
            <div className={`${char.faction}-faction-wrapper`}>
                <CharacterContainer name={`faction-${char.faction}`} index={index} faction={char.faction}>
                    <img src={char.avatar}></img>
                    <NamePlate index={index} faction={char.faction}>
                        <p>{char.name ? char.name : `Admiral ${gameState.playerName}`}</p>
                    </NamePlate>
                </CharacterContainer>
                <TextBox faction={char.faction} index={index} >
                    <div className="text">
                        {
                            char.faction === 'protag' ?
                                (
                                    <Typewriter options={{
                                        delay: 30,
                                        cursor: '',
                                    }}
                                        onInit={(typewriter) => {
                                            typewriter.pauseFor(index * 2500).typeString(char.line).start();
                                        }} />
                                ) :
                                (
                                    <RandomReveal
                                        isPlaying
                                        duration={5 + index * 2}
                                        updateInterval={0.1}
                                        revealDuration={0.5}
                                        characterSet={[
                                            <Rune text='a' key={index} />,
                                            <Rune text='b' key={index} />,
                                            <Rune text='c' key={index} />,
                                            <Rune text='d' key={index} />,
                                            <Rune text='e' key={index} />,
                                            <Rune text='f' key={index} />,
                                        ]}
                                        characters={char.line.split('')}
                                        onComplete={() => ({ shouldRepeat: false, delay: 3 })}
                                    />
                                )
                        }
                    </div>
                    {
                        (choice && gameState.playerVictory) ? (
                            <div className='choice-wrapper'>
                                <Button name='choice__reset' textContent='Pursuit' onClick={() => handleReset('soft')}></Button>
                                <Button name='choice__finish' textContent='Fall back...' onClick={handleGiveUp}></Button>
                            </div>
                        ) : null
                    }
                    {
                        (choice && !gameState.playerVictory) ? (
                            <div className="choice-wrapper">
                                <Button name='choice__reset' textContent='Resist' onClick={() => handleReset('soft')}></Button>
                                <Button name='choice__finish' textContent='Succumb...' onClick={handleGiveUp}></Button>
                            </div>
                        ) : null
                    }
                </TextBox>
            </div>
        </>
    )
}

Character.propTypes = {
    char: PropTypes.object,
    index: PropTypes.number,
    choice: PropTypes.bool,
    victory: PropTypes.bool,
    setAxis: PropTypes.func
}