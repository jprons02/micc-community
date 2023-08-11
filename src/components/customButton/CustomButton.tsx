import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface CustomizedButtonProps
  extends Omit<ButtonProps, 'children' | 'style' | 'className'> {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const CustomButton: React.FC<CustomizedButtonProps> = ({
  variant = 'contained',
  className = '',
  style,
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={style}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
