import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import { useV1VehiclesList } from '../api/vehicles/vehicles';
import DataTable from '../components/DataTable';
import { useColumns } from '../constants/columns/FleetManagementColumns';

const FleetManagement: React.FC = () => {
  const { t } = useTranslation();
  const columns = useColumns();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data } = useV1VehiclesList({
    limit: rowsPerPage,
    offset: page * rowsPerPage
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  return (
    <Box>
      <Typography
        variant='h4'
        gutterBottom
      >
        {t('fleetManagement.title')}
      </Typography>
      <DataTable
        data={data?.results as never[]}
        columns={columns}
        totalElements={data?.count || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default FleetManagement;
