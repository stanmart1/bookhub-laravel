import React from 'react';
import { Menu, MenuItem, Button } from '@mui/material';

const BulkActions = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="bulk-actions-button"
        aria-controls={open ? 'bulk-actions-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Bulk Actions
      </Button>
      <Menu
        id="bulk-actions-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Add to collection</MenuItem>
        <MenuItem onClick={handleClose}>Mark as read</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default BulkActions;
