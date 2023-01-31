import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';

import { Box } from '@mui/material';

import { BoxPaper } from '../../components/BoxPaper';
import Carrousel from '../../components/Carrousel';
import Form from '../../components/Form';
import { MyPaper } from '../../components/MyPaper';


const Login = () => {
    const navigate = useNavigate();
    const userLogged = useAppSelector((state) => state.userLogged);

    useEffect(() => {
        if(userLogged.name !== '') { 
            navigate('/tasks');
        } 
    }, [navigate, userLogged.name]);

    return (
        <Box display='flex'
            justifyContent='center' 
            alignItems='center' 
            height='100vh'
            width='100%'
        >
            <MyPaper>
                <BoxPaper>
                    <Form isMode='login' />
                </BoxPaper>
                <BoxPaper isCarrousel>
                    <Carrousel />
                </BoxPaper>
            </MyPaper> 
        </Box>
       
    );
};

export default Login;