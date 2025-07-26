import React from 'react';
import { Container, Box } from '@mui/material';

interface GuestLayoutProps {
    children: React.ReactNode;
}

const GuestLayout = ({ children }: GuestLayoutProps) => {
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {children}
            </Box>
        </Container>
    );
};

export default GuestLayout;
