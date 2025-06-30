import { Button as MuiButton, ButtonProps, CircularProgress } from '@mui/material';
import { ReactNode } from 'react';

interface CustomButtonProps extends ButtonProps {
  children: ReactNode;
  isLoading?: boolean;
}

const Button = ({ children, isLoading = false, disabled, ...props }: CustomButtonProps) => {
  return (
    <MuiButton
      variant="contained"
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : children}
    </MuiButton>
  );
};

export default Button;