import React from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

const ImportData: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography
        variant='h4'
        gutterBottom
      >
        {t('importData.title')}
      </Typography>
      <Typography variant='body1'>{t('importData.description')}</Typography>
    </Box>
  );
};

export default ImportData;
