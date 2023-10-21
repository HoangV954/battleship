import styled from 'styled-components';

const StyledBoard = styled.div.attrs((props) => ({
    className: `${props.name}-board`
}))`
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    display: grid;
    grid-template: repeat(10, 1fr) / repeat(10, 1fr);
    border: 2px solid ${(props) => (props.name === 'player' ? 'blue' : 'red')};
    position: absolute;
    top: 0;
    left: 0;
    `
const LayerBoard = styled.div.attrs((props) => ({
    className: `${props.name}-pseudo-board`
}))`
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    display: grid;
    grid-template: repeat(10, 1fr) / repeat(10, 1fr);
    border: 2px solid ${(props) => (props.name === 'player' ? 'blue' : 'red')};
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
`
//Stacking items on top of each other requires careful planning if drag-n-drop is to be used. Best possible approach is z-index

export { StyledBoard, LayerBoard }