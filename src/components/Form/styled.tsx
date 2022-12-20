import styled from 'styled-components';

interface DivFormProps {
    isSignupDivForm?: boolean,
    isLoginDivForm?: boolean,
    isAttAccountDivForm?: boolean
};

export const DivForm = styled.div<DivFormProps>`
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
    width: 100%;
    height: 100%;

    gap: ${props => props.isSignupDivForm && '2rem'};
    padding: ${props => props.isSignupDivForm && '2rem 4rem'};

    gap: ${props => props.isLoginDivForm && '4rem'};
    padding: ${props => props.isLoginDivForm && '4rem'};

    gap: ${props => props.isAttAccountDivForm && '2rem'};
    padding: ${props => props.isAttAccountDivForm && '0 1rem'};

    //background-color: ${props => props.theme.bgColor};

    img {
        width: 20rem;
    }

    // --- RESPONSIVIDADE ---
    @media only screen and ( max-width: 1640px ) {
        gap: ${props => props.isSignupDivForm ? '1rem' : '3rem'};
    }
`;