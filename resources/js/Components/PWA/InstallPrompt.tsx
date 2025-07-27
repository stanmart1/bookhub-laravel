import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const InstallPrompt = ({ onInstall }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Install App</Typography>
        <Typography variant="body2">
          Install this application on your home screen for a better experience.
        </Typography>
        <Button variant="contained" color="primary" onClick={onInstall}>
          Install
        </Button>
      </CardContent>
    </Card>
  );
};

export default InstallPrompt;
