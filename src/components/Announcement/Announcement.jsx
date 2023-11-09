import './announcement.scss';
import { useContext, useEffect, useState } from 'react';
import GameContext from '../../hooks/GameContext';
import Typewriter from 'typewriter-effect';


export default function Announcement() {
    const { gameState } = useContext(GameContext);

    const [key, setKey] = useState(0);


    useEffect(() => {

        setKey((prevKey) => prevKey + 1);

    }, [gameState.message])

    return (
        <div className="announcement-bar">
            <div className='announcement-wrapper'>
                <div className='helper-avatar'></div>
                <div className='helper-text'>
                    <Typewriter
                        key={key}
                        options={{
                            delay: 30,
                            cursor: '',
                            autoStart: true,
                        }}
                        onInit={(typewriter) => {
                            typewriter.typeString(gameState.message).start();
                        }} />

                </div>
            </div>
        </div>
    )
}