import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';
import AppLayout from '../../Layouts/AppLayout';
import SubscriptionManagement from '../../Components/Account/SubscriptionManagement';

const Billing = () => {
    return (
        <AppLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    Billing
                </Typography>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Subscription
                        </Typography>
                        <SubscriptionManagement />
                    </CardContent>
                </Card>
            </Container>
        </AppLayout>
    );
};

export default Billing;
