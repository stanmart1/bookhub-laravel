import React from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

const GiftCards = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Redeem a Gift Card</Typography>
        <TextField
          label="Gift Card Code"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary">
          Redeem
        </Button>
      </CardContent>
    </Card>
  );
};

export default GiftCards;
