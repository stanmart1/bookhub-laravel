import React from 'react';
import { Container } from '@mui/material';
import TwoFactorForm from '../../Components/Auth/TwoFactorForm';

const TwoFactorChallenge = () => {
  return (
    <Container maxWidth="xs">
      <TwoFactorForm />
    </Container>
  );
};

export default TwoFactorChallenge;
