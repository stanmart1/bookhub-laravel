import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, People, Book, ShoppingCart } from '@mui/icons-material';
import { Link } from '@inertiajs/inertia-react';

const AdminSidebar = () => {
    return (
        <List>
            <ListItem button component={Link} href="/admin/dashboard">
                <ListItemIcon>
                    <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} href="/admin/users">
                <ListItemIcon>
                    <People />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItem>
            <ListItem button component={Link} href="/admin/books">
                <ListItemIcon>
                    <Book />
                </ListItemIcon>
                <ListItemText primary="Books" />
            </ListItem>
            <ListItem button component={Link} href="/admin/orders">
                <ListItemIcon>
                    <ShoppingCart />
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItem>
        </List>
    );
};

export default AdminSidebar;
