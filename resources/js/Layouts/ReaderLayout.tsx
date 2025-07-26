import React from 'react';
import { Box } from '@mui/material';

interface ReaderLayoutProps {
    children: React.ReactNode;
}

const ReaderLayout = ({ children }: ReaderLayoutProps) => {
    return (
        <Box sx={{
            height: '100vh',
            width: '100vw',
            overflow: 'hidden',
        }}>
            {children}
        </Box>
    );
};

export default ReaderLayout;
