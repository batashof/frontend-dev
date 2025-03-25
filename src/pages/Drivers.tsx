import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Typography } from '@mui/material';
import CustomButton from 'components/CustomButton';
import DataTable from 'components/DataTable';
import { SelectedItems } from 'components/FilterMenu';
import Search from 'components/Search';
import { useColumns } from 'constants/columns/DriversColumns';

import { useV1DriversList } from '../api/drivers/drivers';

const Drivers: React.FC = () => {
  const columns = useColumns();
  const { t } = useTranslation();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [filters, setFilters] = useState<{ [key: string]: SelectedItems[] }>({});

  const statusFilters = filters?.status?.map(item => item.value).toString();
  const workPermitExpiryRange = filters?.work_permit_expiry?.[0];

  const { data } = useV1DriversList({
    limit: rowsPerPage,
    offset: page * rowsPerPage,
    status__in: statusFilters,
    work_permit_expiry__range: workPermitExpiryRange
      ? `${workPermitExpiryRange.startDate},${workPermitExpiryRange.endDate}`
      : undefined
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleFilterChange = (newFilters: { [key: string]: SelectedItems[] }) => {
    setFilters(newFilters);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <Typography
          variant='h4'
          sx={{ marginRight: '2rem' }}
        >
          {t('drivers.title')}
        </Typography>
        <Search />
        <CustomButton
          titleCustom='Create new driver'
          buttonType='submit'
          endIcon={<AddCircleOutlineIcon />}
          sx={{ marginLeft: 'auto' }}
        />
      </Box>

      <DataTable
        data={data?.results as never[]}
        columns={columns}
        totalElements={data?.count || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onFilterChange={handleFilterChange}
      />
    </Box>
  );
};

export default Drivers;
