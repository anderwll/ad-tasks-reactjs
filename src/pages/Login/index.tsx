import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';

import Grid from '@mui/material/Grid'
import { Paper } from '@mui/material';

import { BoxPaper } from '../../components/BoxPaper';
import Carrousel from '../../components/Carrousel';
import Form from '../../components/Form';


const Login = () => {
    const navigate = useNavigate();
    const userLogged = useAppSelector((state) => state.userLogged);

    useEffect(() => {
        if(userLogged.name !== '') { 
            navigate('/tasks');
        } 
    }, [navigate, userLogged.name]);

    return (
        <>
            <Grid container 
                justifyContent='center' 
                alignItems='center' 
                height='100vh'
            >
                <Grid item sm={12} md={10} lg={8} xl={7}>
                    <Paper 
                        sx={{display: 'flex', 
                            flexDirection: 'row' , 
                            height: '40rem', 
                            borderRadius: 5, 
                            overflow: 'hidden'
                        }} 
                        elevation={10}
                    >
                        <BoxPaper>
                            <Form isMode='login' />
                        </BoxPaper>
                        <BoxPaper isCarrousel>
                            <Carrousel />
                        </BoxPaper>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default Login;