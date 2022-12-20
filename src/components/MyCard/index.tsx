import React from 'react';

import { useAppSelector } from '../../store/hooks';

import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

interface MyCardProps {
    title: string,
    description: string,
    onClickEdit: React.MouseEventHandler,
    onClickDelet: React.MouseEventHandler
}

const MyCard: React.FC<MyCardProps> = ({ title, description, onClickEdit, onClickDelet }) => {

    const darkMode = useAppSelector((state) => state.userLogged.darkMode)

    return (
        <Card sx={{  minHeight: 275, display: 'flex', justifyContent: 'space-between', flexDirection: 'column', p: 1, background: `${darkMode ? '#434347' : '#fff'}` }}>
            <CardContent>
                <Typography sx={{ fontSize: 20 }} color={darkMode ? '#fff' : '#000'} gutterBottom >
                    {title}
                </Typography>
                
                <Typography sx={{ mb: 1.5 }} color={darkMode ? '#fff' : '#000'}>
                    {description}
                </Typography>
                
            </CardContent>
            <CardActions>
                <Button variant='contained' color='info' sx={{p: 1.5}} onClick={onClickEdit}><Edit/></Button>
                <Button variant='contained' color='secondary' sx={{p: 1.5}} onClick={onClickDelet}><Delete/></Button>
            </CardActions>
        </Card>
    );
};

export default MyCard;