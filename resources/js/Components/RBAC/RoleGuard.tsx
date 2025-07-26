import React from 'react';
import { useAuthStore } from '../../Store/authStore';
import AccessDenied from './AccessDenied';

interface RoleGuardProps {
    children: React.ReactNode;
    roles: string[];
}

const RoleGuard = ({ children, roles }: RoleGuardProps) => {
    const { hasRole } = useAuthStore();

    const userHasRequiredRole = roles.some((role) => hasRole(role));

    if (userHasRequiredRole) {
        return <>{children}</>;
    }

    return <AccessDenied />;
};

export default RoleGuard;
