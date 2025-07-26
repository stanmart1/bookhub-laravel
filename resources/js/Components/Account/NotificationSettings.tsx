import React from 'react';
import { List, ListItem, ListItemText, Switch, Divider, Typography } from '@mui/material';

const NotificationSettings = () => {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Typography variant="h6">Notification Settings</Typography>
            <ListItem>
                <ListItemText id="switch-list-label-email" primary="Email Notifications" />
                <Switch
                    edge="end"
                    // onChange={handleToggle('email')}
                    // checked={checked.indexOf('email') !== -1}
                    inputProps={{
                        'aria-labelledby': 'switch-list-label-email',
                    }}
                />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText id="switch-list-label-push" primary="Push Notifications" />
                <Switch
                    edge="end"
                    // onChange={handleToggle('push')}
                    // checked={checked.indexOf('push') !== -1}
                    inputProps={{
                        'aria-labelledby': 'switch-list-label-push',
                    }}
                />
            </ListItem>
        </List>
    );
};

export default NotificationSettings;
