import styled from 'styled-components';

interface SideBarProps {
    isMenuOpen?: boolean
}

export const Side = styled.div<SideBarProps>`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    position: fixed;
    width: ${props => props.isMenuOpen ? '20rem' : '5rem'};
    height: 100vh;
    transition: all 0.8s;
    overflow: hidden;
    z-index: 1;
    border-right: 0.1rem solid #c1c3c5;
    background-color: ${props => props.theme.bgColorBody};
    box-shadow: 0 0 1rem 0 rgba(3, 3, 3, 0.37);

    &&:hover{
        width: 20rem;
    }
`;

interface NavItemProps {
    isLogo?: boolean
    isMenuOpen?: boolean
}

export const NavItem = styled.div<NavItemProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 20rem;
    height: ${props => props.isLogo ? '8rem' : '5rem'};
    border-bottom: 0.1rem solid #c1c3c5;
    cursor: ${props => props.isLogo ? '' : 'pointer'};

    &&:hover {
        background-color: ${props => props.isLogo ? 'transparente' : '#c1c3c5'};
    }

    svg {
        color: ${props => props.isMenuOpen && '#3535c0'} !important;
        color: ${props => props.theme.primary};
    }
`;

export const DivIcons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;    
    position: fixed;
    width: 4.9rem;
    height: 4.9rem;
    left: 0;

    img {
        width: 5rem;
    }
`;

export const DivTitle = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 4.9rem;
    margin-left: 4.9rem;
    padding: 0 0.2rem;
    color: ${props => props.theme.primary};

    h5 {
        font-weight: bold;
        color: ${props => props.theme.primary};
    }

    label {
        color: ${props => props.theme.primary};
    }
`;