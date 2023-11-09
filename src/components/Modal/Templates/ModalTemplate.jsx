import styled from 'styled-components';
import textBgAlly from '../../../assets/imgs/text-bg-ally.png';
import textBgEnemy from '../../../assets/imgs/text-bg-enemy.png';
import loseBg from '../../../assets/imgs/chaos-won.jpg';
import winBg from '../../../assets/imgs/imperial-won2.jpg';
import imperiumEnd from '../../../assets/imgs/imperium-end.jpg';
import chaosEnd from '../../../assets/imgs/chaos-end.jpg';

const ModalContainer = styled.div.attrs({
    className: 'modal-wrapper'
}).withConfig({
    shouldForwardProp: (prop) => !['victory', 'goodend', 'badend'].includes(prop),
})`
    width: 100%;
    height: ${(props) => (props.goodend || props.badend) ? '100vh' : '1400px'};
    display: ${(props) => (props.goodend || props.badend) ? 'flex' : ''};
    align-items: center;
    justify-content: center;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))
    ${(props) => (props.goodend && !props.badend) ? `, url(${imperiumEnd})` : ''}
    ${(props) => (!props.goodend && props.badend) ? `, url(${chaosEnd})` : ''}
    ${(props) => (props.victory && !props.goodend && !props.badend) ? `, url(${winBg})` : `, url(${loseBg})`};
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
`

const Ending = styled.div.attrs({
    className: 'ending-wrapper'
}).withConfig({
    shouldForwardProp: (prop) => !['goodend', 'badend'].includes(prop),
})`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height: 50%
`

const CharacterContainer = styled.div.attrs((props) => ({
    className: `${props.name}`
})).withConfig({
    shouldForwardProp: (prop) => !['index', 'faction'].includes(prop),
})`
position: relative;
animation: fadeIn 5s ${(props) => props.index * 2.5}s forwards;
opacity: 0;
`

const TextBox = styled.div.attrs({
    className: 'bubble'
}).withConfig({
    shouldForwardProp: (prop) => !['index', 'faction'].includes(prop),
})`
position: relative;
display: flex;
flex-direction: column;
width: 31.25rem;
min-height: 7rem;
max-height: auto;
opacity: 0;
animation: ${(props) => props.faction === 'protag' ? `moveRight 5s ${props.index * 2.5}s` : `moveLeft 5s ${props.index * 2.5}s`} forwards;
background: ${(props) => props.faction === 'protag'
        ? `url(${textBgAlly})`
        : `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url(${textBgEnemy})`
    };
margin-top: 5rem;
border-radius: 4px;
border: 4px solid  ${(props) => props.faction === 'protag' ? `rgba(0, 255, 255, 0.3)` : `rgba(183, 10, 10, 0.644)`};
box-shadow: ${(props) => props.faction === 'protag' ? 'inset 0 0 10px 2px rgba(0, 255, 255, 0.3), 0 0 5px 2px rgba(0, 255, 255, 0.1)' : 'inset 0 0 10px 2px rgba(183, 10, 10, 0.644), 0 0 5px 2px rgba(237, 35, 35, 0.1)'};
`

const NamePlate = styled.div.attrs({
    className: 'char-name'
}).withConfig({
    shouldForwardProp: (prop) => !['index', 'faction'].includes(prop),
})`
color: white;
min-width: 100%;
max-width: 100%;
height: 3rem;
display: flex;
align-items: center;
justify-content: center;
background-color: red;
font-family: 'plate';
padding: 0.9rem 1rem 0.8rem 1rem;
font-size: 0.9rem;
line-height: 1rem;
letter-spacing: 0.06rem;
text-align: center;
background: ${(props) => props.faction === 'protag'
        ? `url(${textBgAlly})`
        : `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url(${textBgEnemy})`
    };
border: 4px solid  ${(props) => props.faction === 'protag' ? `rgba(0, 255, 255, 0.3)` : `rgba(183, 10, 10, 0.644)`};
box-shadow: ${(props) => props.faction === 'protag' ? 'inset 0 0 10px 2px rgba(0, 255, 255, 0.3), 0 0 5px 2px rgba(0, 255, 255, 0.1)' : 'inset 0 0 10px 2px rgba(183, 10, 10, 0.644), 0 0 5px 2px rgba(237, 35, 35, 0.1)'};
border-radius: 1.2rem;
`

export { ModalContainer, CharacterContainer, TextBox, NamePlate, Ending }