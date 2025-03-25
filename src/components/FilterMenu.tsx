import React, { useState } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import { Box, Checkbox, List, ListItem, ListItemText, Popover, Typography } from '@mui/material';

import CustomButton from './CustomButton';
import DateRangePicker, { DateRangePickerProps } from './DateRangePicker';

export interface SelectedItems {
  value?: string;
  label?: string;
  startDate?: null | string | undefined;
  endDate?: null | string | undefined;
}

interface FilterMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  title: string;
  onClose: () => void;
  menuItems: { label: string; value: string }[] | string;
  selectedItems: SelectedItems[];
  onDone: (selectedItems: SelectedItems[]) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  anchorEl,
  open,
  title,
  onClose,
  menuItems,
  selectedItems,
  onDone
}) => {
  const [localSelectedItems, setLocalSelectedItems] = useState<SelectedItems[]>(selectedItems);

  const handleToggle = (value: string, label: string) => {
    const currentIndex = localSelectedItems.findIndex(item => item.value === value);
    const newSelectedItems = [...localSelectedItems];

    if (currentIndex === -1) {
      newSelectedItems.push({ value, label });
    } else {
      newSelectedItems.splice(currentIndex, 1);
    }

    setLocalSelectedItems(newSelectedItems);
  };

  const handleDateRangeChange: DateRangePickerProps['onStartDateChange'] = startDate => {
    setLocalSelectedItems(prev => {
      const dateRangeItem = prev.find(
        item => item.startDate !== undefined || item.endDate !== undefined
      );
      if (dateRangeItem) {
        dateRangeItem.startDate = startDate;
      } else {
        prev.push({ startDate, endDate: null });
      }
      return [...prev];
    });
  };

  const handleEndDateChange: DateRangePickerProps['onEndDateChange'] = endDate => {
    setLocalSelectedItems(prev => {
      const dateRangeItem = prev.find(
        item => item.startDate !== undefined || item.endDate !== undefined
      );
      if (dateRangeItem) {
        dateRangeItem.endDate = endDate;
      } else {
        prev.push({ startDate: null, endDate });
      }
      return [...prev];
    });
  };

  const handleDone = () => {
    onDone(localSelectedItems);
    onClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: '20px'
          }
        }
      }}
    >
      <Box
        sx={{
          borderRadius: '20px',
          border: '1px solid #ccc',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          variant='body2'
          sx={{ fontSize: '12px' }}
        >
          {title}
        </Typography>

        {menuItems !== 'date' && typeof menuItems !== 'string' ? (
          <List>
            {menuItems.map(item => (
              <ListItem
                key={item.value}
                dense
                onClick={() => handleToggle(item.value, item.label)}
                sx={{ padding: 0, gap: '15px' }}
              >
                <ListItemText>{item.label}</ListItemText>
                <Checkbox
                  edge='start'
                  checked={localSelectedItems.some(selected => selected.value === item.value)}
                  tabIndex={-1}
                  disableRipple
                  sx={{
                    '&.Mui-checked': {
                      color: '#FFD858'
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <DateRangePicker
            startDate={
              localSelectedItems.find(item => item.startDate !== undefined)?.startDate || null
            }
            endDate={localSelectedItems.find(item => item.endDate !== undefined)?.endDate || null}
            onStartDateChange={handleDateRangeChange}
            onEndDateChange={handleEndDateChange}
          />
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
          <CustomButton
            titleCustom='Cancel'
            size='small'
            buttonType='cancel'
            onClick={onClose}
          />
          <CustomButton
            titleCustom='Done'
            size='small'
            sx={{ width: '100%' }}
            buttonType='submit'
            icon={<CheckIcon />}
            onClick={handleDone}
          />
        </Box>
      </Box>
    </Popover>
  );
};

export default FilterMenu;
