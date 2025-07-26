import React from 'react';
import { Alert, Container, Typography } from '@mui/material';

const AccessDenied = () => {
    return (
        <Container>
            <Alert severity="error" sx={{ mt: 4 }}>
                <Typography variant="h6">Access Denied</Typography>
                <Typography>You do not have permission to view this page.</Typography>
            </Alert>
        </Container>
    );
};

export default AccessDenied;
