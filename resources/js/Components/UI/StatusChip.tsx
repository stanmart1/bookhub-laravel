import React from 'react';
import { Chip, ChipProps } from '@mui/material';

type StatusChipProps = ChipProps & {
    status: 'success' | 'error' | 'warning' | 'info' | 'default';
};

const StatusChip = ({ status, ...props }: StatusChipProps) => {
    const colorMap = {
        success: 'success',
        error: 'error',
        warning: 'warning',
        info: 'info',
        default: 'default',
    };

    return <Chip {...props} color={colorMap[status] as ChipProps['color']} />;
};

export default StatusChip;
