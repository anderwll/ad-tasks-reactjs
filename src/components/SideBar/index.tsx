import React from 'react';

import { Side, NavItem, DivTitle, DivIcons } from './styled';
import { AddCircleOutline, Menu, Search, Settings, Logout } from '@mui/icons-material';
import { TextField, Typography } from '@mui/material';

interface SideBarProps {
    isMenuOpen: boolean, 
    onClickMenu: React.MouseEventHandler,
    onClickSearch?: React.MouseEventHandler,
    onClickAdd: React.MouseEventHandler,
    onClickSettings: React.MouseEventHandler,
    onClickLogout: React.MouseEventHandler,
}

const SideBar: React.FC<SideBarProps> = ({ isMenuOpen, onClickMenu, onClickSearch, onClickAdd, onClickSettings, onClickLogout }) => {
    return (
        <Side isMenuOpen={isMenuOpen}>
            <NavItem isLogo>
                <DivIcons><img src="./assets/logo2.png" alt="logo2.png" /></DivIcons>
                <DivTitle>
                    <Typography variant="h5" color="initial">AD TASKS</Typography>
                </DivTitle>
            </NavItem>
            <NavItem isMenuOpen={isMenuOpen} onClick={onClickMenu}>
                <DivIcons><Menu/></DivIcons>
            </NavItem>
            <NavItem>
                <DivIcons><Search/></DivIcons>
                <DivTitle>
                    <TextField id="search" label="Search (In production)" variant="outlined" />
                </DivTitle>
            </NavItem>
            <NavItem onClick={onClickAdd}>
                <DivIcons><AddCircleOutline/></DivIcons>
                <DivTitle>Add New Tasks</DivTitle>
            </NavItem>
            <NavItem onClick={onClickSettings}>
                <DivIcons><Settings/></DivIcons>
                <DivTitle>Settings</DivTitle>
            </NavItem>
            <NavItem onClick={onClickLogout}>
                <DivIcons><Logout/></DivIcons>
                <DivTitle>Logout</DivTitle>
            </NavItem>
        </Side>
    );
};

export default SideBar;