import React from 'react';
import { Chip } from '@mui/material';
import { useAuthStore } from '../../Store/authStore';

const RoleIndicator = () => {
    const { roles } = useAuthStore();

    if (roles.length === 0) {
        return null;
    }

    return (
        <>
            {roles.map((role) => (
                <Chip key={role} label={role} color="primary" size="small" sx={{ ml: 1 }} />
            ))}
        </>
    );
};

export default RoleIndicator;
