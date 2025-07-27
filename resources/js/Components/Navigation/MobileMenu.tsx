import React from 'react';
import { SwipeableDrawer } from '@mui/material';

const MobileMenu = ({ open, onClose, onOpen }) => {
  return (
    <SwipeableDrawer anchor="left" open={open} onClose={onClose} onOpen={onOpen}>
      {/* Menu content */}
    </SwipeableDrawer>
  );
};

export default MobileMenu;
