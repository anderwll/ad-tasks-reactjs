import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, CardActions, CardContent, List, ListItem, ListItemText, Modal, Typography } from '@mui/material';
import { Close, Delete, Edit } from '@mui/icons-material';
import { CardSection } from './styled';
import { ButtonDarkMode } from './button';
import MyModal from '../MyModal';

import { User } from '../../store/modules/typeStore';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { editAccount, logout } from '../../store/modules/userLogged/userLoggedSlice';
import { deletUser } from '../../store/modules/users/usersSlice';
import MyAlert from '../MyAlert';

interface MySettingsProps {
    isOpenModal: boolean,
    isCloseModal: React.MouseEventHandler,
}

const MySettings: React.FC<MySettingsProps> = ({ isOpenModal, isCloseModal }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [openModalEditAccount, setOpenModalEditAccount] = useState(false);
    const [openModalDeletAccount, setOpenModalDeletAccount] = useState(false);

    type TypeAlert = 'error' | 'warning' | 'info' | 'success'
    const [alert, setAlert] = useState('');
    const [typeAlert, setTypeAlert] = useState<TypeAlert>();

    const userLogged = useAppSelector((state) => state.userLogged)
    const [darkMode, setDarkMode] = useState(userLogged.darkMode);

    useEffect(() => {
        darkModeFc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [darkMode]);
 
    const showModalEditAccount = () => {
        setOpenModalEditAccount(!openModalEditAccount);
    };

    const showModalDeletAccount = () => {
        setOpenModalDeletAccount(!openModalDeletAccount);
    };

    const showDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const darkModeFc = () => {
        const darkUser: User = {
            name: userLogged.name,
            email: userLogged.email,
            password: userLogged.password,
            darkMode: darkMode,
            tasks: userLogged.tasks
        }

        dispatch(editAccount(darkUser));
    };

    const deletAccount = () => {
        dispatch(deletUser(userLogged.email));
        alertFc('Successfully deleted account', 'success')
        logoutFc();
    }

    const logoutFc = () => {
        dispatch(logout());

        setTimeout(() => {
            navigate('/logout');
        }, 1000)
    }

    const alertFc = (msg: string, type: TypeAlert) => {
        setAlert(msg);
        setTypeAlert(type);

        setTimeout(() => {
            setAlert('');
        }, 3000);
    };

    return (
        <>
            <Modal
                open={isOpenModal}
                onClose={isCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CardSection>
                    <Card sx={{minHeight: '100%', minWidth: '100%', bgcolor: `${darkMode ? '#18181b' : '#fff'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', p: 1}}>
                        <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',textAlign: 'center', width: '100%', gap: 2}}>
                            <Typography variant='h4' color={darkMode ? '#fff' : '#000'} gutterBottom>
                                Settings
                            </Typography>

                            {/* DARK MODE */}
                            <List sx={{ width: '100%', maxWidth: '100%', height: '100%', maxHeight: '100%', bgcolor: `${darkMode ? '#434347' : '#e2e2e2'}`, borderRadius: 1 }}>
                                <ListItem>
                                    <ListItemText primary={<Typography variant="h5" color={darkMode ? '#fff' : '#000'}>Dark Mode</Typography>} />
                                    <ButtonDarkMode sx={{ m: 1 }} defaultChecked={darkMode} onClick={showDarkMode} />
                                </ListItem>
                            </List>

                            {/* EDIT ACCOUNT */}
                            <List sx={{ width: '100%', maxWidth: '100%', height: '100%', maxHeight: '100%', bgcolor: `${darkMode ? '#434347' : '#e2e2e2'}`, borderRadius: 1 }}>
                                <ListItem>
                                    <ListItemText primary={<Typography variant="h5" color={darkMode ? '#fff' : '#000'}>Edit Account</Typography>} /> 
                                    <Button variant='contained' color='info' sx={{p: 1.5}} onClick={showModalEditAccount}><Edit/></Button>
                                </ListItem>
                            </List>

                            {/* DELET ACCOUNT */}
                            <List sx={{ width: '100%', maxWidth: '100%', height: '100%', maxHeight: '100%', bgcolor: `${darkMode ? '#434347' : '#e2e2e2'}`, borderRadius: 1 }}>
                                <ListItem>
                                    <ListItemText primary={<Typography variant="h5" color={darkMode ? '#fff' : '#000'}>Delete account</Typography>} />
                                    <Button variant='contained' color='error' sx={{p: 1.5}} onClick={showModalDeletAccount}><Delete/></Button>
                                </ListItem>
                            </List>
                        </CardContent>
                        <CardActions>
                            <Button variant='contained' color='secondary' sx={{p: 1.5}} onClick={isCloseModal}><Close/></Button>
                        </CardActions>
                    </Card>
                </CardSection>    
            </Modal>

            {/* MODAL EDIT ACCOUNT */}
            <MyModal isMode='attAccount'
                isOpenModal={openModalEditAccount}
                isCloseModal={showModalEditAccount}
            />

            {/* MODAL CONFIRM DELET ACCOUNT */}
            <MyModal isMode='deletAccount'
                isOpenModal={openModalDeletAccount}
                isCloseModal={showModalDeletAccount}
                onClickAdd={deletAccount}
            />

            {/* ALERT */}
            {alert !== '' && ( <MyAlert type={typeAlert} text={alert}/> )}
        </>
    );
};

export default MySettings;