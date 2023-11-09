import Logo from "../Logo/Logo";
import './intro.scss';
import { useState, useContext } from "react";
import GameContext from "../../hooks/GameContext";
import Button from "../../utils/Button";
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import introTheme from '../../assets/sound/menu-theme.mp3';
import btnClick from '../../assets/sound/button-confirm.mp3';
import ReactHowler from 'react-howler';

export default function Intro() {
    const { gameDispatch } = useContext(GameContext);
    const [inputError, setInputError] = useState('');
    // Empty string = falsy
    const [inputVal, setInputVal] = useState('');
    const [playBtnConfirm] = useSound(btnClick, { volume: 0.5 });

    const handleChange = (e) => {
        setInputVal(e.target.value);
        setInputError('');
    }

    const handleConfirm = (e) => {
        e.preventDefault();
        playBtnConfirm();
        if (inputVal.trim() === '') {
            setInputError('Your ID is required to operate the Imperial Fleet!');
            return
        }
        const submitNameAction = {
            type: 'SETUP_GAME',
            payload: { inputVal }
        }
        gameDispatch(submitNameAction);
    }



    return (
        <div className="intro-wrapper">
            <ReactHowler
                src={introTheme}
                playing={true}
                loop={true}
            />
            <Logo />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 5, delay: 1 }}
                key="form">
                <form>
                    <input
                        type="text"
                        placeholder="Identify yourself!"
                        onChange={handleChange}
                        value={inputVal}
                        maxLength={8}
                        pattern=".*\S+.*"
                    />
                    <Button type='submit' name="intro__submit" textContent="To the Warp!" onClick={handleConfirm}></Button>
                </form>
            </motion.div>
            {inputError && (<p className="intro__error">{inputError}</p>)}
        </div>
    )
}