import React from 'react';

import { Typography } from '@mui/material';
import { Nav, SectionNav } from './styled';
import { useAppSelector } from '../../store/hooks';

interface NavBarProps {
    isMenuOpen: boolean,
    onClickMenu: React.MouseEventHandler
}

const NavBar: React.FC<NavBarProps> = ({ isMenuOpen, onClickMenu }) => {
    const name = useAppSelector((state) => state.userLogged.name)

    return (
        <SectionNav>
            <Nav isMenuOpen={isMenuOpen} onClick={onClickMenu}>
                <Typography variant="h4">Welcome, {name}</Typography>
            </Nav>
        </SectionNav>
    );
};

export default NavBar;