import React from 'react';
import { Box, Typography } from '@mui/material';
import { Inbox } from '@mui/icons-material';

interface EmptyStateProps {
    message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                border: '1px dashed',
                borderColor: 'grey.300',
                borderRadius: 1,
            }}
        >
            <Inbox sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6">{message}</Typography>
        </Box>
    );
};

export default EmptyState;
