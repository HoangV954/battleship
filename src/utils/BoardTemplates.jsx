import styled from 'styled-components';

const StyledGameContainer = styled.div.attrs({
    className: 'game-container'
})`
    display: grid;
    position: relative;
    width: 100%;
    height: auto;
    grid-template: 1fr 9rem 5rem 40rem 3rem/ 1fr 1fr;
    grid-template-areas:
        "logo logo"
        "text text"
        "axis axis"
        "board board"
        "footer footer";
`

const StyledBoard = styled.div.attrs((props) => ({
    className: `${props.name}-board`
}))`
    width: ${(props) => props.size}rem;
    height: ${(props) => props.size}rem;
    display: grid;
    grid-template: repeat(10, 1fr) / repeat(10, 1fr);
    gap: 0.3rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    `
const LayerBoard = styled.div.attrs((props) => ({
    className: `${props.name}-pseudo-board`
}))`
    width: ${(props) => props.size}rem;
    height: ${(props) => props.size}rem;
    display: grid;
    grid-template: repeat(10, 1fr) / repeat(10, 1fr);
    gap: 0.3rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`
//Stacking items on top of each other requires careful planning if drag-n-drop is to be used. Best possible approach is z-index

export { StyledGameContainer, StyledBoard, LayerBoard }