import React from 'react';
import { Button } from '@mui/material';

const ImageUpload = () => {
  return (
    <Button variant="contained" component="label">
      Upload File
      <input type="file" hidden />
    </Button>
  );
};

export default ImageUpload;
