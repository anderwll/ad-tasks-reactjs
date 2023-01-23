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

    padding: ${props => props.isSignupDivForm && '1rem 3rem'};

    gap: ${props => props.isLoginDivForm && '2rem'};
    padding: ${props => props.isLoginDivForm && '3rem'};

    gap: ${props => props.isAttAccountDivForm && '2rem'};
    padding: ${props => props.isAttAccountDivForm && '0 1rem'};

    img {
        width: 20rem;
    }
`;