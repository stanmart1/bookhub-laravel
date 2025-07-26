import React from 'react';
import { ButtonGroup, Button, TextField } from '@mui/material';

interface QuantitySelectorProps {
    quantity: number;
    onQuantityChange: (quantity: number) => void;
}

const QuantitySelector = ({ quantity, onQuantityChange }: QuantitySelectorProps) => {
    const handleDecrement = () => {
        if (quantity > 1) {
            onQuantityChange(quantity - 1);
        }
    };

    const handleIncrement = () => {
        onQuantityChange(quantity + 1);
    };

    return (
        <ButtonGroup size="small" aria-label="small outlined button group">
            <Button onClick={handleDecrement}>-</Button>
            <TextField size="small" value={quantity} sx={{ width: '50px', textAlign: 'center' }} />
            <Button onClick={handleIncrement}>+</Button>
        </ButtonGroup>
    );
};

export default QuantitySelector;
