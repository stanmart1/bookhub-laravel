import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu as MenuIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

const ReaderToolbar = ({ title, onMenuClick, onMoreClick }) => {
  return (
    <AppBar position="static" sx={{ display: 'none' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="more"
          onClick={onMoreClick}
        >
          <MoreVertIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default ReaderToolbar;
