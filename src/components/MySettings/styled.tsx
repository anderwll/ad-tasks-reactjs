import styled from 'styled-components';

export const CardSection = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40vw;
    height: 50vh;
    box-shadow: 2rem;

    @media screen and (max-width: 1200px) {
        width: 55vw;
    }

    @media screen and (max-width: 900px) {
        width: 70vw;
    }

    @media screen and (max-width: 600px) {
        width: 85vw;
    }
`;