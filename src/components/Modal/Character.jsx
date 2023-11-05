import { CharacterContainer, TextBox, NamePlate } from './Templates/ModalTemplate';
import PropTypes from 'prop-types';
import Typewriter from 'typewriter-effect';
import { RandomReveal } from "react-random-reveal";
import { useContext } from 'react';
import GameContext from '../../hooks/GameContext';
import Rune from './Templates/RuneText';
import Button from '../../utils/Button';

export default function Character({ char, index, choice }) {

    const { gameState, gameDispatch } = useContext(GameContext);

    const handleGiveUp = () => {
        gameDispatch({ type: 'GIVE_UP' })
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
                        choice ? (
                            <div className='choice-wrapper'>
                                <Button name='choice__reset' textContent='Fight on !!'></Button>
                                <Button name='choice__finish' textContent='Give up...' onClick={handleGiveUp}></Button>
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
    choice: PropTypes.bool
}