import './announcement.scss';
import { useContext } from 'react';
import GameContext from '../../hooks/GameContext';

export default function Announcement() {
    return (
        <div className="announcement-bar">
            <div className='announcement-wrapper'>
                <div className='helper-avatar'></div>
                <div className='helper-text'>
                    <p>Fuck your mama</p>
                </div>
            </div>
        </div>
    )
}