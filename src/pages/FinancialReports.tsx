import React from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

const FinancialReports: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography
        variant='h4'
        gutterBottom
      >
        {t('financialReports.title')}
      </Typography>
      <Typography variant='body1'>{t('financialReports.description')}</Typography>
    </Box>
  );
};

export default FinancialReports;
