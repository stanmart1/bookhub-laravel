import React from 'react';
import { Container, Card, CardContent } from '@mui/material';
import PasswordChangeForm from '../../Components/Account/PasswordChangeForm';
import TwoFactorSetup from '../../Components/Account/TwoFactorSetup';

const Security = () => {
  return (
    <Container>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <PasswordChangeForm />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <TwoFactorSetup />
        </CardContent>
      </Card>
    </Container>
  );
};

export default Security;
