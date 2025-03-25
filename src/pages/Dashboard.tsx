import React from 'react';

import { Box, Typography } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography
        variant='h4'
        gutterBottom
      >
        Dashboard
      </Typography>
      <Typography variant='body1'>Welcome to the dashboard! This is a protected route.</Typography>
    </Box>
  );
};

export default Dashboard;
