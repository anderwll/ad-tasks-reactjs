import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Signup from '../pages/Signup';
import Tasks from '../pages/Tasks';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/signup' element={<Signup />}/>
                <Route path='/tasks' element={<Tasks />}/>
                <Route path='/logout' element={<Logout />}/>
                <Route path='*' element={<h1>404 NOT FOUND</h1>}/>
            </Routes>
        </BrowserRouter>     
    )
};

export default AppRoutes;