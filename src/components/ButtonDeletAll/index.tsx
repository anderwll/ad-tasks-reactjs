import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deletAllTask } from '../../store/modules/userLogged/userLoggedSlice';

import { Badge, Box, IconButton } from '@mui/material';
import { DeleteForever } from '@mui/icons-material';
import MyModal from '../MyModal';
import MyAlert from '../MyAlert';

const ButtonDeletAll = () => {
    const dispatch = useAppDispatch();
    const [modalDeletOpen, setModalDeletOpen] = useState(false);
    const [alert, setAlert] = useState(false);
    const userLogged = useAppSelector((state) => state.userLogged);
    const darkMode = userLogged.darkMode;
    const counter = userLogged.tasks.length;

    useEffect(() => {
        setTimeout(() => {
            setAlert(false);
        }, 1500)
    }, [alert])

    const showModalDelet = () => {
        if(counter) {
            setModalDeletOpen(!modalDeletOpen);
        }
    }

    const removeAllTasks = () => {
        dispatch(deletAllTask());
        setAlert(true);
        showModalDelet();
    }

    return (
       <>
            <Box display={counter ? 'block' : 'none'} sx={{position: 'fixed', right: '1rem', bottom: '5rem', zIndex: '1'}}>
                <IconButton aria-label="cart" onClick={showModalDelet}>
                    <Badge badgeContent={counter} color="secondary">
                        <DeleteForever color={darkMode ? 'secondary' : 'action'} sx={{fontSize: '2.5rem'}} />
                    </Badge>
                </IconButton>
            </Box>

            {/* MODAL DELETE ALL TASKS */}
            <MyModal isMode='deletAll'
                    isOpenModal={modalDeletOpen} 
                    isCloseModal={showModalDelet} 
                    onClickAdd={removeAllTasks}
            />

            {/* ALERT */}
            {alert && ( <MyAlert type='success' text='All Tasks Deleted Successfully'/> )}
       </>
    );
};

export default ButtonDeletAll;