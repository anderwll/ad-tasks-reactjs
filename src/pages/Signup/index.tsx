import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';

import Grid from '@mui/material/Grid'
import { Paper } from '@mui/material';

import { BoxPaper } from '../../components/BoxPaper';
import Carrousel from '../../components/Carrousel';
import Form from '../../components/Form';


const Signup = () => {
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
                width='100vw'
            >
                <Grid item sm={12} md={10} lg={8} xl={6}>
                    <Paper 
                        sx={{display: 'flex', 
                            flexDirection: 'row' , 
                            height: '100%', 
                            borderRadius: 5, 
                            overflow: 'hidden'
                        }} 
                        elevation={3}
                    >
                        <BoxPaper isCarrousel>
                            <Carrousel />
                        </BoxPaper>
                        <BoxPaper>
                            <Form isMode='signup'/>
                        </BoxPaper>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default Signup;