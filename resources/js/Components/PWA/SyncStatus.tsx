import React from 'react';
import { LinearProgress, Typography } from '@mui/material';

const SyncStatus = ({ isSyncing }) => {
  if (!isSyncing) {
    return null;
  }

  return (
    <div>
      <Typography>Syncing...</Typography>
      <LinearProgress />
    </div>
  );
};

export default SyncStatus;
