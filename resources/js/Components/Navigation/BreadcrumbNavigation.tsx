import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';

const BreadcrumbNavigation = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        Home
      </Link>
      <Typography color="text.primary">Books</Typography>
    </Breadcrumbs>
  );
};

export default BreadcrumbNavigation;
