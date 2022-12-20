import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';
import Typical from 'react-typical';

const Logout = () => {
    const navigate = useNavigate();
   
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 9500)
  
    }, [navigate])

    return (
        <Grid container display='flex' justifyContent='center' alignItems='center' textAlign='center' height='100vh'>
            <Typical 
                wrapper='h1'
                loop={1}
                steps={[
                    '',
                    1200,
                    'Come back often... ',
                    1000,
                    'Thank you :) ', 
                    1000, 
                    '',
                    1200
                ]}
            />
        </Grid>

    );
}; 

export default Logout; 