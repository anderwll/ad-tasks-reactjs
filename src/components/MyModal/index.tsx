import React from 'react';

import { useAppSelector } from '../../store/hooks';

import { Button, Card, CardActions, CardContent, Modal, TextField, Typography } from '@mui/material';
import { Close, Add, Check } from '@mui/icons-material';
import { CardSection } from './styled';
import Form from '../Form';

interface MyModalProps {
    isMode: 'add' | 'att' | 'delet' | 'deletAll' | 'deletAccount' | 'attAccount',
    isOpenModal: boolean,
    isCloseModal: React.MouseEventHandler,
    onClickAdd?: React.MouseEventHandler,
    errorTitle?: boolean,
    errorDesc?: boolean,
    valueTitle?: string,
    valueDesc?: string,
    valueName?: string,
    valueEmail?: string,
    valuePassword?: string,
    valueRePassword?: string,
    onChangeTitle?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    onChangeDesc?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
}

const MyModal: React.FC<MyModalProps> = ({ isMode, isOpenModal, errorTitle, errorDesc, isCloseModal, onClickAdd, valueTitle, valueDesc, onChangeTitle, onChangeDesc }) => {
    const darkMode = useAppSelector((state) => state.userLogged.darkMode);

    return (
        <>
            <Modal
                open={isOpenModal}
                onClose={isCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CardSection>
                    <Card sx={{minHeight: '100%', minWidth: '100%', bgcolor: `${darkMode ? '#434347' : '#fff'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', p: 1}}>
                        <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',textAlign: 'center', width: '100%', gap: 2}}>
                            {isMode === 'add' && (
                                <>
                                    <Typography variant='h4' color={darkMode ? '#fff' : '#000'} gutterBottom>
                                        Add a new tasks
                                    </Typography>

                                    <TextField error={errorTitle} fullWidth variant="outlined" color='secondary' id="title" label="Title" value={valueTitle} onChange={onChangeTitle}/>
                                    <TextField error={errorDesc} fullWidth variant="outlined" color='secondary' id="title" label="Description" value={valueDesc} onChange={onChangeDesc}/>
                                </>
                            )}
                            {isMode === 'att' && (
                                <>
                                    <Typography variant='h4' color={darkMode ? '#fff' : '#000'} gutterBottom>
                                        Editing task
                                    </Typography>

                                    <TextField error={errorTitle} fullWidth variant="outlined" color='secondary' id="title" label="Title" value={valueTitle} onChange={onChangeTitle}/>
                                    <TextField error={errorDesc} fullWidth variant="outlined" color='secondary' id="title" label="Description" value={valueDesc} onChange={onChangeDesc}/>
                                </>
                            )}
                            {isMode === 'delet' && (
                                <Typography variant='h4' color={darkMode ? '#fff' : '#000'} gutterBottom>
                                    Are you sure you want to delete?
                                </Typography>
                            )}
                            {isMode === 'deletAll' && (
                                <Typography variant='h4' color={darkMode ? '#fff' : '#000'} gutterBottom>
                                    Are you sure you want to permanently delete all tasks?
                                </Typography>
                            )}
                            {isMode === 'deletAccount' && (
                                <Typography variant='h4' color={darkMode ? '#fff' : '#000'} gutterBottom>
                                    Are you sure you want to permanently delete your account?
                                </Typography>
                            )}
                            {isMode === 'attAccount' && (
                                <>
                                    <Typography variant='h4' color={darkMode ? '#fff' : '#000'} gutterBottom>
                                        Edit account
                                    </Typography>
                                   <Form isMode='attAccount' />
                                </>
                            )}
                        </CardContent>
                        <CardActions>
                            {isMode === 'add' && (
                                <Button variant='contained' color='info' sx={{p: 1.5}} onClick={onClickAdd}><Add/></Button>
                            )}
                            {isMode === 'att' && (
                                <Button variant='contained' color='info' sx={{p: 1.5}} onClick={onClickAdd}><Check/></Button>
                            )}
                            {(isMode === 'delet' || isMode === 'deletAll' || isMode === 'deletAccount') && (
                                <Button variant='contained' color='error' sx={{p: 1.5}} onClick={onClickAdd}><Check/></Button>
                            )}
                            <Button variant='contained' color='secondary' sx={{p: 1.5}} onClick={isCloseModal}><Close/></Button>
                        </CardActions>
                    </Card>
                </CardSection>    
            </Modal>
        </>
    );
};

export default MyModal;