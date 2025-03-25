import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { AssignedVehicleList } from '../../api/api.schemas';
import { Column } from '../../types';
import { formatDate } from '../../utils/dateUtils';

export const useColumns = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns: Column[] = [
    {
      id: 'name',
      label: t('drivers.name'),
      minWidth: 200,
      format: (value: string, row: any) => (
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => navigate(`/driver/${row.uuid}`)}
        >
          {`${row.first_name} ${row.last_name}`}
        </span>
      )
    },
    {
      id: 'assigned_vehicles',
      label: t('drivers.carNumber'),
      minWidth: 120,
      format: (value: AssignedVehicleList[]) => (
        <>
          {value?.map((item, key: number) => (
            <span key={item.vehicle_id}>
              {key && ','}
              {item.number_plate}
            </span>
          ))}
        </>
      )
    },
    {
      id: 'status',
      label: t('drivers.status'),
      minWidth: 150,
      filter: [
        { label: t('drivers.statusActive'), value: 'active' },
        { label: t('drivers.statusSuspended'), value: 'suspended' },
        { label: t('drivers.statusTerminated'), value: 'terminated' },
        { label: t('drivers.statusAwaitingAssignment'), value: 'awaiting_assignment' }
      ],
      format: (value: string) => {
        switch (value) {
          case 'active':
            return t('drivers.statusActive');
          case 'terminated':
            return t('drivers.statusTerminated');
          case 'suspended':
            return t('drivers.statusSuspended');
          case 'awaiting_assignment':
            return t('drivers.statusAwaitingAssignment');
          default:
            return value;
        }
      }
    },
    {
      id: 'work_permit_expiry',
      label: t('drivers.workPermitExpiry'),
      minWidth: 150,
      filter: 'date',
      format: (value: string | null) => (value ? formatDate(value, 'dd.MM.yyyy') : '-')
    }
  ];
  return columns;
};
