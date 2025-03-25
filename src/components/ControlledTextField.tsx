import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { TextField, TextFieldProps } from '@mui/material';

interface ControlledTextFieldProps extends Omit<TextFieldProps, 'name'> {
  name: string;
}

const ControlledTextField: React.FC<ControlledTextFieldProps> = ({ name, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          variant={'standard'}
          error={!!error}
          helperText={error ? error.message : null}
          fullWidth
        />
      )}
    />
  );
};

export default ControlledTextField;
