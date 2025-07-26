import React from 'react';
import { Typography, Button } from '@mui/material';

const SubscriptionManagement = () => {
    return (
        <div>
            <Typography sx={{ mb: 2 }}>
                You are currently on the <strong>Premium Plan</strong>.
            </Typography>
            <Button variant="contained" sx={{ mr: 1 }}>Change Plan</Button>
            <Button variant="outlined" color="error">Cancel Subscription</Button>
        </div>
    );
};

export default SubscriptionManagement;
