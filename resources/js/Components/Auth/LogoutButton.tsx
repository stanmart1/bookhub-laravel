import React from 'react';
import { IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useAuthStore } from '../../Store/authStore';

const LogoutButton = () => {
    const { logout } = useAuthStore();

    return (
        <IconButton onClick={() => logout()} color="inherit">
            <Logout />
        </IconButton>
    );
};

export default LogoutButton;
