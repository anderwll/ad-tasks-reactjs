import styled from 'styled-components';

export const CardSection = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 25vw;
    height: 35vh;
    box-shadow: 2rem;

    input {
        color: ${props => props.theme.primary};
    }

    label {
        color: ${props => props.theme.primary};
    }

    @media screen and (max-width: 1200px) {
        width: 45vw;
    }

    @media screen and (max-width: 900px) {
        width: 65vw;
    }

    @media screen and (max-width: 600px) {
        width: 85vw;
    }
`;