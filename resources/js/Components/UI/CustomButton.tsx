import React from 'react';
import { Button, ButtonProps } from '@mui/material';

type CustomButtonProps = ButtonProps & {
    // Add any custom props here
};

const CustomButton = (props: CustomButtonProps) => {
    return <Button {...props} />;
};

export default CustomButton;
