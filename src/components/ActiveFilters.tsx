import React from 'react';

import { Close, DeleteOutlined, FilterAltOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

import { FiltersState } from '../types';
import CustomButton from './CustomButton';

interface ActiveFiltersProps {
  filters: FiltersState;
  onRemoveFilter: (columnId: string, value?: string | undefined) => void;
  onClearAllFilters: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  onRemoveFilter,
  onClearAllFilters
}) => {
  const formatDateRange = (
    startDate: string | null | undefined,
    endDate: string | null | undefined
  ) => {
    if (!startDate || !endDate) return 'Invalid Date Range';

    return `${startDate} - ${endDate}`;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '16px',
        alignItems: 'center'
      }}
    >
      <FilterAltOutlined />
      <Typography sx={{ fontWeight: 700 }}>Filter:</Typography>
      {Object.entries(filters).map(([columnId, values]) =>
        values.map((item, index) => {
          if (item.startDate !== undefined || item.endDate !== undefined) {
            return (
              <Box
                key={`${columnId}-${index}`}
                sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <CustomButton
                  titleCustom={
                    <>
                      <Typography sx={{ fontWeight: 600 }}>{item.columnLabel}:&nbsp;</Typography>
                      <Typography sx={{ fontWeight: 500 }}>
                        {formatDateRange(item.startDate, item.endDate)}
                      </Typography>
                    </>
                  }
                  buttonType='outlined'
                />
                <IconButton
                  size='small'
                  onClick={() => onRemoveFilter(columnId, item.value)}
                  sx={{ marginLeft: '-6px' }}
                >
                  <Close fontSize='small' />
                </IconButton>
              </Box>
            );
          }

          return (
            <Box
              key={`${columnId}-${item.value}`}
              sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <CustomButton
                titleCustom={
                  <>
                    <Typography sx={{ fontWeight: 600 }}>{item.columnLabel}:&nbsp;</Typography>
                    <Typography sx={{ fontWeight: 500 }}>{item.label}</Typography>
                  </>
                }
                buttonType='outlined'
              />
              <IconButton
                size='small'
                onClick={() => onRemoveFilter(columnId, item.value)}
                sx={{ marginLeft: '-6px' }}
              >
                <Close fontSize='small' />
              </IconButton>
            </Box>
          );
        })
      )}
      {Object.keys(filters).length > 0 && (
        <CustomButton
          titleCustom='Delete all filters'
          endIcon={<DeleteOutlined fontSize='small' />}
          buttonType='cancel'
          onClick={onClearAllFilters}
        />
      )}
    </Box>
  );
};

export default ActiveFilters;
