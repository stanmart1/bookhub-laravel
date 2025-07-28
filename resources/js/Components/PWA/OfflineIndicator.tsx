import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const OfflineIndicator = () => {
  const [isOffline, setIsOffline] = React.useState(!navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Snackbar open={isOffline}>
      <Alert severity="warning" sx={{ width: '100%' }}>
        You are currently offline.
      </Alert>
    </Snackbar>
  );
};

export default OfflineIndicator;
