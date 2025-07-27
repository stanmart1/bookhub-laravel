import React from 'react';
import { Button, Box } from '@mui/material';
import { Link } from '@inertiajs/react';
import useAuthStore from '@/Store/authStore';

const MainNavigation = () => {
  const { user } = useAuth();

  return (
    <Box>
      <Button component={Link} href="/" color="inherit">
        Home
      </Button>
      <Button component={Link} href="/books" color="inherit">
        Books
      </Button>
      {user?.roles?.includes('admin') && (
        <Button component={Link} href="/admin/dashboard" color="inherit">
          Admin
        </Button>
      )}
    </Box>
  );
};

export default MainNavigation;
