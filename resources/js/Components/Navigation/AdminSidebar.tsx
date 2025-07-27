import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from '@inertiajs/react';

const AdminSidebar = () => {
  return (
    <List>
      <ListItem button component={Link} href="/admin/dashboard">
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} href="/admin/users">
        <ListItemText primary="Users" />
      </ListItem>
      <ListItem button component={Link} href="/admin/books">
        <ListItemText primary="Books" />
      </ListItem>
      <ListItem button component={Link} href="/admin/orders">
        <ListItemText primary="Orders" />
      </ListItem>
    </List>
  );
};

export default AdminSidebar;
