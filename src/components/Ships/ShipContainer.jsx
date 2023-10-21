import styled from 'styled-components';

export default styled.div.attrs((props) => ({
    className: 'ship-container',
    id: `${props.type}`
})).withConfig({
    shouldForwardProp: (prop) => !['startX', 'startY', 'length', 'axis'].includes(prop),
})`
display: flex;
height: ${(props) => props.axis === 'x' ? '30' : props.length * 30}px;
width: ${(props) => props.axis === 'x' ? props.length * 30 : '30'}px;
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