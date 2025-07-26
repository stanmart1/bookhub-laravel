import React from 'react';
import { useAuthStore } from '../../Store/authStore';

interface PermissionGateProps {
    children: React.ReactNode;
    permission: string;
}

const PermissionGate = ({ children, permission }: PermissionGateProps) => {
    const { hasPermission } = useAuthStore();

    if (hasPermission(permission)) {
        return <>{children}</>;
    }

    return null;
};

export default PermissionGate;
