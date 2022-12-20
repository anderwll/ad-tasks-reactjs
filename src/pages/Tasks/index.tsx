import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { attUser } from '../../store/modules/users/usersSlice';
import { addTask, deletTask, editTask, logout } from '../../store/modules/userLogged/userLoggedSlice';

import { Typography, Grid } from '@mui/material'
import ButtonAdd from '../../components/ButtonAdd';
import SideBar from '../../components/SideBar';
import NavBar from '../../components/NavBar';
import MyCard from '../../components/MyCard';
import MyModal from '../../components/MyModal';
import MyAlert from '../../components/MyAlert';
import MySettings from '../../components/MySettings';
import { Task } from '../../store/modules/typeStore';
import { SectionCards } from './styled';

const Tasks = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAttOpen, setModalAttOpen] = useState(false);
    const [modalDeletOpen, setModalDeletOpen] = useState(false);
    const [settings, setSettings] = useState(false);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [id, setId] = useState(-1);

    const [errorTitle, setErrorTitle] = useState(false);
    const [errorDesc, setErrorDesc] = useState(false);

    type TypeAlert = 'error' | 'warning' | 'info' | 'success'
    const [alert, setAlert] = useState('');
    const [typeAlert, setTypeAlert] = useState<TypeAlert>();

    const userLogged = useAppSelector((state) => state.userLogged);

    const darkMode = userLogged.darkMode;

    useEffect(() => {
        if(userLogged.name === '') { 
            alertFc('You must be logged!', 'warning')

            setTimeout(() => {
                navigate('/');
            }, 1500)
   
        }     
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        title !== '' && setErrorTitle(false);
        desc !== '' && setErrorDesc(false);
    }, [title, desc])


    const showMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const showModal = () => {
        setModalOpen(!modalOpen);
        clearInputs();
        setErrorTitle(false);
        setErrorDesc(false);
    }

    const showModalAtt = () => {
        setModalAttOpen(!modalAttOpen);
        clearInputs();
        setId(-1);
    }

    const showModalDelet = (id: number) => {
        setModalDeletOpen(!modalDeletOpen);
        setId(id);
    }

    const showSettings = () => {
        setSettings(!settings);
    }

    const addNewTasks = () => {
        let ultimoId: number = userLogged.tasks.length + 1;

        if(userLogged.tasks.length >= 2){
            let ultimoRegistro = userLogged.tasks.reduce((anterior, proximo) => {
                if(anterior.id > proximo.id){
                    return anterior
                }else{
                    return proximo
                }
            });
    
            ultimoId = ultimoRegistro.id + 1;
        }

        title === '' && setErrorTitle(true); 
        desc === '' && setErrorDesc(true); 

        if(title !== '' && desc !== '') {
            const newTasks = {
                id: ultimoId,
                title: title,
                desc: desc,
            }
    
            dispatch(addTask(newTasks));
            alertFc('Task added successfully.', 'success');
            setErrorTitle(false);
            setErrorDesc(false);
            showModal();

        } else {
            alertFc('Save only valid tasks', 'warning');
        }
    }

    const removeTasks = (id: number) => {
        const indice = userLogged.tasks.findIndex((tasks) => tasks.id === id);
        
        if(indice >= 0) {
            dispatch(deletTask({id: id, title, desc}))
            setModalDeletOpen(false);
            setId(-1);
            alertFc('Task deleted.', 'success'); 

        }  
    }

    const prepareEdition = (index: number) => {
        setModalAttOpen(true);
        setId(userLogged.tasks[index].id)
        setTitle(userLogged.tasks[index].title);
        setDesc(userLogged.tasks[index].desc);
    };

    const saveEdition = (tasks: Task) => {
        const indice = userLogged.tasks.findIndex((e) => e.id === tasks.id);

        if(indice >= 0) {
            title === '' && setErrorTitle(true);
            desc === '' && setErrorDesc(true);

            if(title !== '' && desc !== '') {
                dispatch(editTask(tasks))

                alertFc('Updated task.', 'success');
                showModalAtt();
            } else {
                alertFc('Save only valid tasks', 'warning');
            }
        }
    };

    const clearInputs = () => {
        setTitle('');
        setDesc('');
    };

    const attUserFc = () => {
        alertFc('Saving tasks.', 'success');
        dispatch(attUser(userLogged));

        setTimeout(() => {
            logoutFc();
        }, 1000); 
    }

    const logoutFc = () => {
        dispatch(logout());
        navigate('/logout'); 
    };

    const alertFc = (msg: string, type: TypeAlert) => {
        setAlert(msg);
        setTypeAlert(type);

        setTimeout(() => {
            setAlert('');
        }, 3000);
    };

    return (
        <>
            {/* MENU LATERAL */}
            <SideBar isMenuOpen={menuOpen}  
                    onClickMenu={showMenu}
                    onClickAdd={showModal}
                    onClickSettings={showSettings}
                    onClickLogout={attUserFc}
            />

            {/* MENU SUPERIOR */}
            <NavBar isMenuOpen={menuOpen}
                    onClickMenu={() => setMenuOpen(false)}
            />

            {/* SECTION CARDS */}
            <SectionCards>
                <Grid container spacing={4} padding={4} marginTop={0} width={menuOpen ? 'calc(100vw - 20rem)' : 'calc(100vw - 5rem)'} marginLeft={menuOpen ? '20rem' : '5rem'} bgcolor={darkMode ? '#18181b' : '#e2e2e2'} sx={{transition: 'all .4s'}} onClick={() => setMenuOpen(false)}>
                    <Grid item xs={12}>
                        <Typography variant="h2" color={darkMode ? '#fff' : '#000'}>My tasks</Typography>
                    </Grid>
                    {userLogged.tasks.map((e, index) => {
                        return (
                            <Grid item xs={12} sm={9} md={6} lg={4} xl={3} key={index}>
                                <MyCard title={e.title}
                                        description={e.desc}
                                        onClickEdit={() => prepareEdition(index)}
                                        onClickDelet={() => showModalDelet(e.id)}
                                />
                            </Grid>
                        )
                    })
                    }
                </Grid>
            </SectionCards>

            {/* BUTTON ADD TASKS */}
            <ButtonAdd onClickAdd={showModal}/>

            {/* MODAL ADD NEW TASKS */}
            <MyModal isMode='add' 
                    isOpenModal={modalOpen} 
                    isCloseModal={showModal} 
                    onClickAdd={addNewTasks}
                    errorTitle={errorTitle}
                    errorDesc={errorDesc}
                    valueTitle={title}
                    valueDesc={desc}
                    onChangeTitle={(e) => setTitle(e.target.value)}
                    onChangeDesc={(e) => setDesc(e.target.value)}
            />

            {/* MODAL ATT TASKS */}
            <MyModal isMode='att' 
                    isOpenModal={modalAttOpen} 
                    isCloseModal={showModalAtt} 
                    onClickAdd={() => saveEdition({id: id, title: title, desc: desc})}
                    errorTitle={errorTitle}
                    errorDesc={errorDesc}
                    valueTitle={title}
                    valueDesc={desc}
                    onChangeTitle={(e) => setTitle(e.target.value)}
                    onChangeDesc={(e) => setDesc(e.target.value)}
            />

            {/* MODAL DELETE TASKS */}
            <MyModal isMode='delet'
                    isOpenModal={modalDeletOpen} 
                    isCloseModal={() => showModalDelet(id)} 
                    onClickAdd={() => removeTasks(id)}
            />

            {/* MODAL SETTINGS */}
            <MySettings isOpenModal={settings}
                    isCloseModal={showSettings}
            />

            {/* ALERT */}
            {alert !== '' && ( <MyAlert type={typeAlert} text={alert}/> )}
        </>
    );
};

export default Tasks;