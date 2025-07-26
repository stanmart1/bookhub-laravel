import React from 'react';
import { Box } from '@mui/material';
import AppLayout from './AppLayout';
import RoleGuard from '../Components/RBAC/RoleGuard';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    return (
        <RoleGuard roles={['admin']}>
            <AppLayout>
                <Box>{children}</Box>
            </AppLayout>
        </RoleGuard>
    );
};

export default AdminLayout;
