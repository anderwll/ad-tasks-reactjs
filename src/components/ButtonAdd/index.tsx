import React from 'react';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface ButtonAddProps {
    onClickAdd: React.MouseEventHandler
}

const ButtonAdd: React.FC<ButtonAddProps> = ({ onClickAdd }) => {
    return (
        <Box sx={{position: 'fixed', bottom: '1rem', right: '1rem'}}>
            <Fab color="info" aria-label="add" onClick={onClickAdd}>
                <AddIcon />
            </Fab>
        </Box>
    );
};

export default ButtonAdd;