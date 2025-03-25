import React, { ReactNode } from 'react';

import { Box, Typography } from '@mui/material';

interface FormContainerProps {
  title?: string;
  children?: ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ title = '', children }) => {
  return (
    <Box sx={{ backgroundColor: 'white', borderRadius: 4, padding: 4 }}>
      <Typography
        sx={{
          fontSize: '18px',
          fontWeight: 600,
          textTransform: 'uppercase',
          marginBottom: 3
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default FormContainer;
