import React from 'react';
import { Button, Typography } from '@mui/material';

const TwoFactorSetup = () => {
    return (
        <div>
            <Typography sx={{ mb: 2 }}>
                Two-factor authentication is currently disabled.
            </Typography>
            <Button variant="contained">Enable</Button>
        </div>
    );
};

export default TwoFactorSetup;
