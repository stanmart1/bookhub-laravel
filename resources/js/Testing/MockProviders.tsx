import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from '../Store/authStore';

const queryClient = new QueryClient();

const MockProviders = ({ children }) => {
  const auth = useAuth.getState();
  // You can customize the mock auth state here
  auth.user = { name: 'Test User', roles: ['admin'], permissions: ['manage_users'] };
  auth.isAuthenticated = true;

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default MockProviders;
