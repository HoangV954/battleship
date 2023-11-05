import { useEffect, useContext } from "react";
import { ModalContainer } from "./Templates/ModalTemplate";
import { winnerDialogue, loserDialogue, goOn, giveUp } from "../../utils/gameData";
import Character from "./Character";
import Arrow from "./Arrow";
import GameContext from "../../hooks/GameContext";
import PropTypes from 'prop-types';
import '../Modal/modal.scss';

export default function Modal({ victory }) {

    const { gameState } = useContext(GameContext)

    useEffect(() => {
        // Scroll to the top of the modal when it renders
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <ModalContainer victory={victory ? 'true' : 'false'}>
            <div className="dialogue-container">
                {victory ? (
                    winnerDialogue.map((char, idx) => {
                        if (idx !== winnerDialogue.length - 1) {
                            return (<Character key={char.key} char={char} index={idx} choice={false}></Character>)
                        } else {

                            return (<Character key={char.key} char={char} index={idx} choice={true}></Character>)
                        }
                    })
                ) :
                    null
                }
                {
                    (victory && gameState.giveUp) &&
                    (
                        giveUp.map((char, idx) => (
                            <Character key={char.key} char={char} index={idx} choice={false}></Character>
                        ))
                    )
                }
            </div>
            <Arrow></Arrow>
        </ModalContainer>
    )
}

Modal.propTypes = {
    victory: PropTypes.bool.isRequired
}