import React, { useEffect, useState } from 'react';

import { useAppSelector } from '../../store/hooks';

import { Badge, Box, IconButton } from '@mui/material';
import { Task } from '@mui/icons-material';

const Notification = () => {
    const userLoggedTasksLength = useAppSelector((state) => state.userLogged.tasks.length);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if(userLoggedTasksLength) {
            setCounter(counter +1)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userLoggedTasksLength])

    return (
        <Box sx={{position: 'fixed', right: '1rem', top: '1rem', zIndex: '1'}}>
            <IconButton aria-label="cart" onClick={() => setCounter(0)}>
                <Badge badgeContent={userLoggedTasksLength} color="secondary">
                    <Task color="action" sx={{fontSize: '2rem'}} />
                </Badge>
            </IconButton>
        </Box>
    );
};

export default Notification;