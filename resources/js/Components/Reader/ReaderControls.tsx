import React from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { Bookmark, Highlight, Settings, Share } from '@mui/icons-material';

const ReaderControls = () => {
  const actions = [
    { icon: <Bookmark />, name: 'Bookmark' },
    { icon: <Highlight />, name: 'Highlight' },
    { icon: <Settings />, name: 'Settings' },
    { icon: <Share />, name: 'Share' },
  ];

  return (
    <SpeedDial
      ariaLabel="Reader actions"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
};

export default ReaderControls;
