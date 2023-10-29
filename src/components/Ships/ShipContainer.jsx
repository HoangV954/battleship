import styled from 'styled-components';

export default styled.div.attrs((props) => ({
    className: 'ship-container',
    id: `${props.type}`
})).withConfig({
    shouldForwardProp: (prop) => !['startX', 'startY', 'length', 'axis'].includes(prop),
})`
display: flex;
overflow: hidden;  /* Extremely important along w max width, max height to ensure the container grid isnt affected by ship size */
max-height: ${(props) => props.axis === 'x' ? '3' : props.length * 3}rem;
max-width: ${(props) => props.axis === 'x' ? props.length * 3 : '3'}rem;
cursor: pointer;
grid-column: ${(props) => props.axis === 'x' ?
        `${props.startY}/span ${props.length}`
        : `${props.startY}`
    };
grid-row: ${(props) => props.axis === 'x' ?
        `${props.startX}`
        : `${props.startX}/span ${props.length}`
    };
`