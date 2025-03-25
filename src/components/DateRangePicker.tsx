import React from 'react';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, parseISO } from 'date-fns';

const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '15px',
    height: '40px',
    fontSize: '16px',
    width: '160px',
    padding: '0 16px 0 0',
    backgroundColor: 'transparent',
    border: '1px solid #ccc',
    '&:hover': {
      backgroundColor: '#f5f5f5'
    }
  },
  '& .MuiOutlinedInput-input': {
    padding: '8px 0 8px 14px'
  },
  '& .MuiInputLabel-root': {
    transform: 'none',
    top: '-25px',
    '&.Mui-focused': {
      color: 'rgba(0, 0, 0, 0.6)'
    }
  },
  '& .MuiOutlinedInput-notchedOutline': {
    display: 'none'
  }
}));

export interface DateRangePickerProps {
  startDate: null | string | undefined;
  endDate: null | string | undefined;
  onStartDateChange: (date: string | null) => void;
  onEndDateChange: (date: string | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}) => {
  const formatDate = (date: Date | null): string | null => {
    if (!date) return null;
    return format(date, 'yyyy-MM-dd');
  };

  const handleStartDateChange = (date: Date | null) => {
    const formattedDate = formatDate(date);
    onStartDateChange(formattedDate);
  };

  const handleEndDateChange = (date: Date | null) => {
    const formattedDate = formatDate(date);
    onEndDateChange(formattedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center', margin: '32px 0 16px 0' }}>
        <DatePicker
          label='Start Date'
          value={startDate ? parseISO(startDate) : new Date()}
          onChange={handleStartDateChange}
          slots={{
            textField: StyledTextField
          }}
        />
        <DatePicker
          label='End Date'
          value={endDate ? parseISO(endDate) : new Date()}
          onChange={handleEndDateChange}
          slots={{
            textField: StyledTextField
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
