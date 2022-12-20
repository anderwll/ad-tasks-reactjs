import styled from  'styled-components';

interface BoxPaperProps {
    isCarrousel?: boolean
}

const BoxPaper = styled.div<BoxPaperProps>`
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    width: 50%;
    height: 100%;

    @media only screen and ( max-width: 1000px ) {
        display: ${props => props.isCarrousel ? 'none' : 'flex'};
        width: 100%;
    }

`;

export { BoxPaper };