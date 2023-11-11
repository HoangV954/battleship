import styled from "styled-components";
import loadingGif from '../../assets/imgs/wait.webp'

const StyledLoading = styled.div.attrs({
    className: 'loading-wrapper'
})`
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
justify-content: center
`

export default function Loading() {
    return (
        <StyledLoading>
            <img src={loadingGif} width={'3rem'} height={'3rem'} alt="Loading..." />
        </StyledLoading>
    )
}