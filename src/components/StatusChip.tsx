import React from 'react';

import { Chip } from '@mui/material';

import { getStatusColor } from '../utils/statusUtils';

interface StatusChipProps {
  status: string;
}

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const { color, label } = getStatusColor(status);

  return (
    <Chip
      size='small'
      label={label}
      color={color}
    />
  );
};

export default StatusChip;
