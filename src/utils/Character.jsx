import { CharacterContainer } from "../components/GameBoard/BoardTemplates";
import admiral from "../assets/imgs/admiral.png";
import inquisitor from "../assets/imgs/inquisitor-port.png";
import gulliman from "../assets/imgs/Roboute_Guilliman.webp"

export default function Character() {
    return (
        <>
            <div className="character-wrapper">
                <CharacterContainer name={'character'}>
                    <img src={gulliman}></img>
                </CharacterContainer>
                <div className="bubble">
                    <div className="text">
                        <p>Proident est id deserunt ullamco ullamco commodo pariatur. Do veniam adipisicing nulla duis commodo eu officia amet.</p>
                    </div>
                </div>
            </div>
        </>
    )
}