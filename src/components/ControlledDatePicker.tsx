import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';

interface ControlledDatePickerProps extends Omit<DatePickerProps<Date>, 'onChange' | 'value'> {
  name: string;
}

const ControlledDatePicker: React.FC<ControlledDatePickerProps> = ({ name, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          {...props}
          onChange={date => field.onChange(date)}
          value={new Date(field.value) || null}
          slots={{
            textField: params => (
              <TextField
                {...params}
                variant={'standard'}
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
              />
            )
          }}
        />
      )}
    />
  );
};

export default ControlledDatePicker;
