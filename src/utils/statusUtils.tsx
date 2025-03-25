import { DriverListStatus, VehicleListStatus } from '../api/api.schemas';

interface StatusColor {
  color: 'success' | 'error' | 'warning' | 'info' | 'default';
  label: string;
}

export const getStatusColor = (status: string): StatusColor => {
  switch (status) {
    case DriverListStatus.active:
      return { color: 'success', label: 'Active' };
    case DriverListStatus.terminated:
      return { color: 'error', label: 'Terminated' };
    case DriverListStatus.suspended:
      return { color: 'warning', label: 'Suspended' };
    case DriverListStatus.awaiting_assignment:
      return { color: 'info', label: 'Awaiting Assignment' };

    case VehicleListStatus.available:
      return { color: 'success', label: 'Available' };
    case VehicleListStatus.in_use:
      return { color: 'info', label: 'In Use' };
    case VehicleListStatus.under_maintenance:
      return { color: 'warning', label: 'Under Maintenance' };
    case VehicleListStatus.broken:
      return { color: 'error', label: 'Broken' };
    case VehicleListStatus.sold:
      return { color: 'default', label: 'Sold' };
    case VehicleListStatus.reserved:
      return { color: 'info', label: 'Reserved' };

    default:
      return { color: 'default', label: 'Unknown' };
  }
};
