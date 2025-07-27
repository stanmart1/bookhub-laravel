import React from 'react';
import { Button, Box } from '@mui/material';
import { Link } from '@inertiajs/react';

const MainNavigation = () => {
  return (
    <Box>
      <Button component={Link} href="/" color="inherit">
        Home
      </Button>
      <Button component={Link} href="/books" color="inherit">
        Books
      </Button>
    </Box>
  );
};

export default MainNavigation;
