import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const AdminStats = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Total Users
                        </Typography>
                        <Typography variant="h5">1,234</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Total Books
                        </Typography>
                        <Typography variant="h5">567</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Total Orders
                        </Typography>
                        <Typography variant="h5">890</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Revenue
                        </Typography>
                        <Typography variant="h5">$12,345</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default AdminStats;
