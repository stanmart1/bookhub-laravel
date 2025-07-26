import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from '@inertiajs/inertia-react';
import { useAuthStore } from '../../Store/authStore';
import LogoutButton from '../Auth/LogoutButton';
import RoleIndicator from '../RBAC/RoleIndicator';
import UserMenu from './UserMenu';

const MainNavigation = () => {
    const { isAuthenticated, user } = useAuthStore();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <Typography variant="h6" component="div">
                <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    BookHub
                </Link>
            </Typography>
            <Box>
                {isAuthenticated ? (
                    <>
                        <UserMenu />
                        <RoleIndicator />
                        <LogoutButton />
                    </>
                ) : (
                    <>
                        <Button component={Link} href="/login" color="inherit">
                            Login
                        </Button>
                        <Button component={Link} href="/register" color="inherit">
                            Register
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default MainNavigation;
