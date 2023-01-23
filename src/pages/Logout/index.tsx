import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';
import { Container } from './styled';

const Logout = () => {
    const navigate = useNavigate();
   
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 5000)
  
    }, [navigate])

    return (
        <Container>
           <Typography variant="h2" color="initial">{"Thanks bye bye :)"}</Typography>
        </Container>
    );
}; 

export default Logout; 