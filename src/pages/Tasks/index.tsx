import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { attUser } from '../../store/modules/users/usersSlice';
import { addTask, deletTask, editTask, logout } from '../../store/modules/userLogged/userLoggedSlice';

import { Typography, Grid, Button } from '@mui/material'
import { KeyboardBackspace } from '@mui/icons-material';
import ButtonAdd from '../../components/ButtonAdd';
import SideBar from '../../components/SideBar';
import NavBar from '../../components/NavBar';
import MyCard from '../../components/MyCard';
import MyModal from '../../components/MyModal';
import MyAlert from '../../components/MyAlert';
import MySettings from '../../components/MySettings';
import { Task } from '../../store/modules/typeStore';
import { SectionCards } from './styled';
import ButtonDeletAll from '../../components/ButtonDeletAll';

const Tasks = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const newDate = new Date();

    const [menuOpen, setMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAttOpen, setModalAttOpen] = useState(false);
    const [modalDeletOpen, setModalDeletOpen] = useState(false);
    const [settings, setSettings] = useState(false);

    const [id, setId] = useState(-1);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');

    const [search, setSearch] = useState('');
    const [listSearch, setListSearch] = useState<Task[]>([]);
    
    const [errorTitle, setErrorTitle] = useState(false);
    const [errorDesc, setErrorDesc] = useState(false);

    type TypeAlert = 'error' | 'warning' | 'info' | 'success'
    const [alert, setAlert] = useState('');
    const [typeAlert, setTypeAlert] = useState<TypeAlert>();

    const userLogged = useAppSelector((state) => state.userLogged);

    // --- LIST AUX PARA SER POSSIVEL REALIZAR O .sort() (organiza pelo maior id) ---
    const [listTasks, setListTasks] = useState([...userLogged.tasks]);

    const darkMode = userLogged.darkMode;

    useEffect(() => {
        if(userLogged.name === '') { 
            alertFc('You must be logged!', 'warning')

            setTimeout(() => {
                navigate('/');
            }, 1500)
   
        }     

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        title !== '' && setErrorTitle(false);
        desc !== '' && setErrorDesc(false);
    }, [title, desc]);

    useEffect(()=> {
        setListTasks([...userLogged.tasks]);
        dateFc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userLogged.tasks])

    useEffect(() => {
        console.log('entrou');
        
    }, [listSearch])

    const showMenu = () => {
        setMenuOpen(!menuOpen);
        setSearch('');
    }

    const showModal = () => {
        setModalOpen(!modalOpen);
        clearInputs();
        setErrorTitle(false);
        setErrorDesc(false);
    }

    const showModalAtt = (id: number) => {
        setModalAttOpen(!modalAttOpen);
        clearInputs();
        setId(id);
    }

    const showModalDelet = (id: number) => {
        setModalDeletOpen(!modalDeletOpen);
        setId(id);
    }

    const showSettings = () => {
        setSettings(!settings);
    }

    const dateFc = () => {  
        const day = String(newDate.getDate()).padStart(2, '0');
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const year = newDate.getFullYear();
        const hour = String(newDate.getHours()).padStart(2, '0');
        const minutes = String(newDate.getMinutes()).padStart(2, '0');

        const dateCurrent = `${day}/${month}/${year}-${hour}:${minutes}`;

        setDate(dateCurrent);
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
            const newTasks: Task = {
                id: ultimoId,
                title: title,
                desc: desc,
                date: date,
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
            dispatch(deletTask({id: id, title, desc, date}))
            setModalDeletOpen(false);
            setId(-1);
            setSearch('');
            alertFc('Task deleted.', 'success'); 

        }  
    }

    const prepareEdition = (id: number) => {
        const indice = userLogged.tasks.findIndex((tasks) => tasks.id === id);
        
        setModalAttOpen(true);
        setId(userLogged.tasks[indice].id)
        setTitle(userLogged.tasks[indice].title);
        setDesc(userLogged.tasks[indice].desc);
    };

    const saveEdition = (tasks: Task) => {
        const indice = userLogged.tasks.findIndex((e) => e.id === tasks.id);
        const indiceListSearch = listSearch.findIndex((e) => e.id === tasks.id);

        if(indice >= 0) {
            title === '' && setErrorTitle(true);
            desc === '' && setErrorDesc(true);

            if(title !== '' && desc !== '') {
                const listTempSeacrh = [...listSearch];
                listSearch[indiceListSearch] = tasks

                setListSearch(listTempSeacrh);
                dispatch(editTask(tasks))
            
                alertFc('Updated task.', 'success');
                setSearch('');
                showModalAtt(id);
            } else {
                alertFc('Save only valid tasks', 'warning');
            }
        }
    };

    const clearInputs = () => {
        setTitle('');
        setDesc('');
    };

    const searchFc = (value: string) => {
        setSearch(value);

        const existSearch = userLogged.tasks.filter((task) => task.title.toLowerCase().includes(value.toLowerCase()) || task.desc.toLowerCase().includes(value.toLowerCase()));

       if(existSearch) {
        setListSearch(existSearch)
       }
    }

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
                    valueSearch={search}
                    onChangeSearch={(e) => searchFc(e.target.value)}
                    onClickAdd={showModal}
                    onClickSettings={showSettings}
                    onClickLogout={attUserFc}
            />

            {/* MENU SUPERIOR */}
            <NavBar isMenuOpen={menuOpen}
                    onClickMenu={() => setMenuOpen(false)}
            />

            {/* SECTION CARDS */}
            <SectionCards onClick={() => setMenuOpen(false)} >
                <Grid container spacing={4} padding={4} marginTop={0} width={menuOpen ? 'calc(100vw - 20rem)' : 'calc(100vw - 5rem)'} marginLeft={menuOpen ? '20rem' : '5rem'} bgcolor={darkMode ? '#18181b' : '#e2e2e2'} sx={{transition: 'all .4s'}}>
                    {search !== ''  && (
                        <>
                            <Grid item xs={12}>
                                <Typography variant="h2" color={darkMode ? '#fff' : '#000'}>Results... </Typography>
                            </Grid>
                            <Button variant="text" color="secondary" onClick={() => setSearch('')} sx={{position: 'absolute', marginTop: 7, marginLeft: 37}}>
                                <KeyboardBackspace/> Voltar
                            </Button>
                            {listSearch.map((e, index) => {
                                return (
                                    <Grid item xs={12} sm={9} md={6} lg={4} xl={3} key={index}>
                                        <MyCard title={e.title}
                                                description={e.desc}
                                                date={e.date}
                                                onClickEdit={() => prepareEdition(e.id)}
                                                onClickDelet={() => showModalDelet(e.id)}
                                        />
                                    </Grid>
                                )
                            })
                            }
                        </>
                    )}

                    {search === '' && (
                       <>
                       <Grid item xs={12}>
                            <Typography variant="h2" color={darkMode ? '#fff' : '#000'}>My tasks</Typography>
                        </Grid>
                         {listTasks.sort((a, b) => {
                            if(a.id > b.id) {
                                return -1
                            } else {
                                return 0
                            }
                        }).map((e, index) => {
                            return (
                                <Grid item xs={12} sm={9} md={6} lg={4} xl={3} key={index}>
                                    <MyCard title={e.title}
                                            description={e.desc}
                                            date={e.date}
                                            onClickEdit={() => prepareEdition(e.id)}
                                            onClickDelet={() => showModalDelet(e.id)}
                                    />
                                </Grid>
                            )
                        })
                        }
                       </>
                    )}
                </Grid>
            </SectionCards>

            {/* BUTTON ADD TASKS */}
            <ButtonAdd onClickAdd={showModal}/>

            {/* CONTADOR DE TAREFAS */}
            <ButtonDeletAll/>

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
                    isCloseModal={() => showModalAtt(id)} 
                    onClickAdd={() => saveEdition({id, title, desc, date})}
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