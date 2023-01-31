import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';

import { Box} from '@mui/material';

import { BoxPaper } from '../../components/BoxPaper';
import Carrousel from '../../components/Carrousel';
import Form from '../../components/Form';
import { MyPaper } from '../../components/MyPaper';


const Signup = () => {
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
                <BoxPaper isCarrousel>
                    <Carrousel />
                </BoxPaper>
                <BoxPaper>
                    <Form isMode='signup'/>
                </BoxPaper>
            </MyPaper>
            
        </Box>
    );
};

export default Signup;