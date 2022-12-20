import React from 'react';

import { Alert, Box } from '@mui/material';

interface MyAlertPorps {
    type: 'success' | 'error' | 'info' | 'warning' | undefined,
    text: string
}

const MyAlert: React.FC<MyAlertPorps> = ({ type, text }) => {
    return (
        <Box sx={{position: 'fixed', display: 'flex', justifyContent: 'center', bottom: '3vh', left: '0', width: '100vw', zIndex: '999'}}>
            <Box sx={{width: '20rem'}}>
                <Alert variant='standard' severity={type} sx={{fontSize: '1rem', padding: 2}}>{text}</Alert> 
            </Box>
        </Box> 
    );
};

export default MyAlert;