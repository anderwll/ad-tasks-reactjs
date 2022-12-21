import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Progress = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress color='inherit' />
    </Box>
  );
}

export default Progress;