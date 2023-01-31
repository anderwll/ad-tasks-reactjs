import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { TextField, Typography, Button, Stack, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { DivForm } from './styled';
import  MyAlert from '../MyAlert';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addNewUser, searchUsers } from '../../store/modules/users/usersSlice';
import { login, editAccount } from '../../store/modules/userLogged/userLoggedSlice';

interface FormProps {
    isMode: 'login' | 'signup' | 'attAccount',
};

const Form: React.FC<FormProps> = ({ isMode }) => {
    // --- HOOKS ---
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    // --- HOOKS ERROR ---
    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorRePassword, setErrorRePassword] = useState(false);
    const [errorInput, setErrorInput] = useState(false);

    const [errorSaveAtt, setErrorSaveAtt] = useState(true);
    const darkMode: boolean = useAppSelector((state) => state.userLogged.darkMode);

    // --- ALERT ---
    type TypeAlert = 'error' | 'warning' | 'info' | 'success'
    const [alert, setAlert] = useState('');
    const [typeAlert, setTypeAlert] = useState<TypeAlert>();

    // --- PREENCHE LISTA USERS ---
    const listUsers = useAppSelector(searchUsers);

    // --- SETAR USUARIO LOGADO ---
    const userLogged = useAppSelector((state) => state.userLogged);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // --- VERIFICA SE ESTÁ EM MODO DE EDIÇÃO DE CONTA ---
    useEffect(() => {
        if(isMode === 'attAccount') {
            setName(userLogged.name);
            setEmail(userLogged.email);
        } 
    }, [isMode, userLogged])

    // --- NAVIGATE P/ MUDAR DE PÁGINA ---
    const handleNavigate = () => {
        if(isMode === 'login') {
            navigate('/signup')
        } else {
            navigate('/')
        }
    };

    // --- VALIDA CAMPOS ---
    const handleValidate = (value: string, key: string) => {
        switch(key) {
            case 'name':
                if(isMode === 'attAccount') {
                    userLogged.name.length !== value.length && setErrorSaveAtt(false);
                    value.length < 3 && setErrorSaveAtt(true);  
                }

                if(value.length < 3) {
                    setErrorName(true);
                    setErrorInput(true);
                    alertFc('At least 3 characters.', 'info');
                } else {
                    setErrorName(false);
                }
            break;

            case 'email':
                // eslint-disable-next-line no-useless-escape
                const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                if(!value.match(regexEmail)) {
                    setErrorEmail(true);
                    setErrorInput(true);
                    alertFc('Enter a valid email.', 'warning');
                }else {
                    setErrorEmail(false);
                }
            break;

            case 'password':
                if(isMode === 'signup' || isMode === 'attAccount') {
                    if(!value || value.length < 6) {
                        setErrorPassword(true);
                        setErrorInput(true);  
                        setErrorSaveAtt(true); 
                        alertFc('At least 6 characters!', 'warning');                   
                    } else {
                        setErrorPassword(false);
                    }
                }

                if(isMode === 'login') {
                    if(!value){
                        setErrorPassword(true);
                        setErrorInput(true);
                    } else {
                        setErrorPassword(false);
                        setErrorInput(false);
                    }
                }
            break;

            case 'repassword':
                if(!value || value !== password) {
                    setErrorRePassword(true);
                    setErrorInput(true);
                    setErrorSaveAtt(true);
                    alertFc('Passwords do not match!', 'error');
                } else {
                    setErrorRePassword(false);
                    setErrorInput(false);
                    setErrorSaveAtt(false);
                }
            break

            default:
        }
    };

    // --- CAPTURA INPUTS ---
    const handleChange = (value: string, key: string) => {
        switch(key) {
            case 'name':
                setName(value)
                handleValidate(value, key)
            break;

            case 'email':
                setEmail(value)
                handleValidate(value, key)
            break;

            case 'password':
                setPassword(value)
                handleValidate(value, key)
            break;

            case 'repassword':
                setRePassword(value)
                handleValidate(value, key)
            break

            default:
        }
    };

    // --- CRIA CONTA ---
    const createAccount = () => {
        const newUser = {
            name,
            email,
            password,
            darkMode: false,
            tasks: []
        }

        if(!name || !email || !password || !rePassword) {
            alertFc('Fill in all fields', 'warning')
            setErrorInput(true)   
            return
        };

        const userExist = listUsers.some((user) => user.email === newUser.email);

        if(!userExist) {
            dispatch(addNewUser(newUser))
            clearInputs();
            alertFc('Successfully registered user!', 'success');

            setTimeout(() => {
                navigate('/')
            }, 1500)

        } else {
            alertFc('Email already in use!', 'error');
            setErrorEmail(true)
        }

    };

    // --- ENTRA CONTA ---
    const loginAccount = () => {
        const userExist = listUsers.find((user) => user.email === email && user.password === password);

        if(!userExist) {
            alertFc('Invalid email or password!', 'error');

        } else {
            dispatch(login(userExist));
        
            alertFc('Login successful!', 'success');
            setTimeout(() => {
                navigate('/tasks')
            }, 1500)
        }
    };

    const attAccount = () => {
        const attUser = {
            name,
            email: userLogged.email,
            password: password !== '' ? password : userLogged.password,
            darkMode: userLogged.darkMode,
            tasks: userLogged.tasks
        }
 
        dispatch(editAccount(attUser));
        setErrorSaveAtt(true);
        setPassword('');
        setRePassword('');
        alertFc('Updated account', 'success');   
    };

    // --- LIMPA INPUTS ---
    const clearInputs = () => {
        setName('');
        setEmail('');
        setPassword('');
        setRePassword('');
    };

    // --- FCT P/ MOSTRAR ALERTA ---
    const alertFc = (msg: string, type: TypeAlert) => {
        setAlert(msg);
        setTypeAlert(type);

        setTimeout(() => {
            setAlert('');
        }, 2500);
    };

    return (
        <>
           { isMode === 'signup' && (
                <DivForm isSignupDivForm >
                    <img src="./assets/logo1.png" alt="logo.png" />
                    <Stack spacing={2}  width='100%'>                       
                        <Typography variant="h5" color="initial"> Register in the application </Typography>
                        <TextField fullWidth variant="outlined" label="Name" type='text' value={name} onChange={(e) => handleChange(e.target.value, 'name')} color={errorName ? 'error' : 'primary'} />
                        <TextField fullWidth variant="outlined" label="E-mail" type='email' value={email} onChange={(e) => handleChange(e.target.value, 'email')} color={errorEmail ? 'error' : 'primary'} />
                        <TextField fullWidth variant="outlined" label="Password"  type='password' value={password} onChange={(e) => handleChange(e.target.value, 'password')} color={errorPassword ? 'error' : 'primary'} />
                        <TextField fullWidth variant="outlined" label="Repeat Password"  type='password' value={rePassword} onChange={(e) => handleChange(e.target.value, 'repassword')} color={errorRePassword? 'error' : 'primary'} />
                        <Button fullWidth sx={{p: 1.5}} variant="contained" color="primary" disabled={errorInput} onClick={createAccount}> Signup </Button>
                        <Typography variant="body1" color="initial"> You have an account? <Typography variant="button" color="primary" sx={{cursor: 'pointer', fontWeight: 'bold'}} onClick={handleNavigate}> Access </Typography></Typography>
                    </Stack>
                </DivForm>
           )}

           {isMode === 'login' && (
                <DivForm isLoginDivForm >
                    <img src="./assets/logo1.png" alt="logo.png" />
                    <Stack spacing={2}  width='100%'>
                        <Typography variant="h5" color="initial"> Access the application </Typography>
                        <TextField fullWidth variant="outlined" label="E-mail" type='email' value={email} onChange={(e) => handleChange(e.target.value, 'email')} color={errorName ? 'error' : 'secondary'} />
                        <TextField fullWidth variant="outlined" label="Password"  type='password' value={password} onChange={(e) => handleChange(e.target.value, 'password')} color={errorName ? 'error' : 'secondary'}/>
                        <Button fullWidth sx={{p: 1.5}} variant="contained" color="secondary" disabled={errorInput} onClick={loginAccount}> Login </Button>
                        <Typography variant="body1" color="initial"> Don't have an account? <Typography variant="button" color="secondary" sx={{cursor: 'pointer', fontWeight: 'bold'}} onClick={handleNavigate}> Register </Typography></Typography>
                    </Stack>
                </DivForm>
           )}

            {isMode === 'attAccount' && (
                <DivForm isAttAccountDivForm >
                    <Stack spacing={2} width='100%'>
                        <TextField fullWidth variant="outlined" label="Name" type='text' value={name} onChange={(e) => handleChange(e.target.value, 'name')} color={errorName ? 'error' : 'primary'} />
                        <TextField fullWidth disabled variant="outlined" label="E-mail" type='email' value={email} onChange={(e) => handleChange(e.target.value, 'email')} color={errorEmail ? 'error' : 'primary'} />
                        <Accordion sx={{p: 0.8, border: `1px solid ${darkMode ? '#353434' : '#e2e2e2'}`, borderRadius: 1, bgcolor: `${darkMode ? '#434347' : '#fff'}`}}>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="Edit password"
                                id="edit-password"
                            >
                                <Typography variant="body1" color={darkMode ? '#fff' : '#000'}>New password</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TextField sx={{marginBottom: 2}} fullWidth variant="outlined" label="New Password"  type='password' value={password} onChange={(e) => handleChange(e.target.value, 'password')} color={errorPassword ? 'error' : 'primary'} />
                                <TextField fullWidth variant="outlined" label="Repeat a New Password"  type='password' value={rePassword} onChange={(e) => handleChange(e.target.value, 'repassword')} color={errorRePassword? 'error' : 'primary'} />
                            </AccordionDetails>
                        </Accordion>
                        <Button fullWidth sx={{p: 1.5}} variant="contained" color="primary" disabled={errorSaveAtt} onClick={attAccount}> Save </Button>  
                    </Stack>
                </DivForm>
            )}

            {alert !== '' && ( <MyAlert type={typeAlert} text={alert}/> )}
        </>
    );
};

export default Form;




