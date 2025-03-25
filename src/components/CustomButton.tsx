import React from 'react';

import { Button, ButtonProps, styled } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  titleCustom: React.ReactNode | string;
  icon?: React.ReactNode;
  buttonType?: 'submit' | 'cancel' | 'outlined' | 'error';
  size?: 'small' | 'medium' | 'large';
}

const StyledButton = styled(Button)<{
  buttonType?: 'submit' | 'cancel' | 'outlined' | 'error';
  size: 'small' | 'medium' | 'large';
}>(({ buttonType, size }) => ({
  borderRadius: '15px',
  height: size === 'small' ? '32px' : '40px',
  fontSize: size === 'small' ? '14px' : '16px',
  width: 'fit-content',
  boxShadow: 'none',
  padding: '0 16px',
  textTransform: 'none',
  backgroundColor:
    buttonType === 'submit'
      ? '#000'
      : buttonType === 'outlined'
        ? 'transparent'
        : buttonType === 'error'
          ? '#FFD7D7'
          : '#ccc',
  color: buttonType === 'submit' ? '#fff' : buttonType === 'error' ? '#FF0000' : '#000',
  border: buttonType === 'outlined' ? '1px solid #ccc' : 'none',
  '&:hover': {
    backgroundColor:
      buttonType === 'submit'
        ? '#333'
        : buttonType === 'outlined'
          ? '#f5f5f5'
          : buttonType === 'error'
            ? '#FFC0C0'
            : '#ddd'
  }
}));

const CustomButton: React.FC<CustomButtonProps> = ({
  titleCustom,
  icon,
  buttonType = 'submit',
  size = 'medium',
  onClick,
  ...props
}) => {
  return (
    <StyledButton
      variant={buttonType === 'outlined' ? 'outlined' : 'contained'}
      buttonType={buttonType}
      size={size}
      onClick={onClick}
      startIcon={icon}
      {...props}
    >
      {titleCustom}
    </StyledButton>
  );
};

export default CustomButton;
