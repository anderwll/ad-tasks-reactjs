import styled from 'styled-components';

interface NavBarProps {
    isMenuOpen: boolean
}

export const SectionNav = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.bgColorBody};
`;

export const Nav = styled.div<NavBarProps>`
    display: flex;
    align-items: end;
    width: 80%;
    height: 8rem;
    margin-left: ${props => props.isMenuOpen ? '23rem' : '8rem'};
    border-bottom: 0.1rem solid #c1c3c5;
    transition: all 0.8s;
    
    h4 {
        color: ${props => props.theme.primary};
    }
`;
