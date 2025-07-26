import React from 'react';
import { AppBar, Drawer, Toolbar, Box, CssBaseline } from '@mui/material';
import MainNavigation from '../Components/Navigation/MainNavigation';
import AdminSidebar from '../Components/Navigation/AdminSidebar';
import { useAuthStore } from '../Store/authStore';

const drawerWidth = 240;

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
    const { hasRole } = useAuthStore();
    const isAdmin = hasRole('admin');

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <MainNavigation />
                </Toolbar>
            </AppBar>
            {isAdmin && (
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <AdminSidebar />
                </Drawer>
            )}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default AppLayout;
