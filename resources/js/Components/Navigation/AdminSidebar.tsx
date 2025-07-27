import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from '@inertiajs/react';
import useAuthStore from '@/Store/authStore';

const AdminSidebar = () => {
  const { hasPermission } = useAuth();

  return (
    <List>
      <ListItem button component={Link} href="/admin/dashboard">
        <ListItemText primary="Dashboard" />
      </ListItem>
      {hasPermission('manage_users') && (
        <ListItem button component={Link} href="/admin/users">
          <ListItemText primary="Users" />
        </ListItem>
      )}
      {hasPermission('manage_books') && (
        <ListItem button component={Link} href="/admin/books">
          <ListItemText primary="Books" />
        </ListItem>
      )}
      {hasPermission('manage_orders') && (
        <ListItem button component={Link} href="/admin/orders">
          <ListItemText primary="Orders" />
        </ListItem>
      )}
    </List>
  );
};

export default AdminSidebar;
