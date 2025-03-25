import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import { Tenant } from '../../api/api.schemas';
import { Column } from '../../types';
import { formatDate } from '../../utils/dateUtils';
export const useColumns = () => {
  const { t } = useTranslation();

  const columns: Column[] = [
    {
      id: 'number_plate',
      label: t('fleetManagement.numberPlate'),
      minWidth: 100,
      format: (value: string) => (
        <Box
          sx={{
            border: '1px solid black',
            borderRadius: '5px',
            textAlign: 'center',
            maxWidth: 100
          }}
        >
          {value}
        </Box>
      )
    },
    {
      id: 'owner',
      label: t('fleetManagement.owner'),
      minWidth: 150
    },
    {
      id: 'status',
      label: t('fleetManagement.status'),
      minWidth: 150
    },
    {
      id: 'tenant',
      label: t('fleetManagement.tenant'),
      minWidth: 150,
      format: (value: Tenant) => value.name
    },
    {
      id: 'insurance_expiry',
      label: t('fleetManagement.insuranceExpiry'),
      minWidth: 150,
      format: (value: string) => formatDate(value, 'dd.MM.yyyy')
    },
    {
      id: 'maintenance_expiry',
      label: t('fleetManagement.maintenanceExpiry'),
      minWidth: 150,
      format: (value: string) => formatDate(value, 'dd.MM.yyyy')
    },
    {
      id: 'created_at',
      label: t('fleetManagement.createdAt'),
      minWidth: 150,
      format: (value: string) => formatDate(value, 'dd.MM.yyyy HH:mm')
    },
    {
      id: 'updated_at',
      label: t('fleetManagement.updatedAt'),
      minWidth: 150,
      format: (value: string) => formatDate(value, 'dd.MM.yyyy HH:mm')
    }
  ];
  return columns;
};
