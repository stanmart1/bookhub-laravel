import React, { useState } from 'react';
import { Button } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

interface AddToCartButtonProps {
    onClick: () => Promise<void>;
}

const AddToCartButton = ({ onClick }: AddToCartButtonProps) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        await onClick();
        setLoading(false);
    };

    return (
        <Button
            variant="contained"
            startIcon={<AddShoppingCart />}
            onClick={handleClick}
            disabled={loading}
        >
            {loading ? 'Adding...' : 'Add to Cart'}
        </Button>
    );
};

export default AddToCartButton;
