import React from 'react';
import { Button } from '@mui/material';

const ProofUpload = () => {
  return (
    <Button variant="contained" component="label">
      Upload Proof of Payment
      <input type="file" hidden />
    </Button>
  );
};

export default ProofUpload;
