import React from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const ReaderModal = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90vw',
        height: '90vh',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <Close />
        </IconButton>
        {children}
      </Box>
    </Modal>
  );
};

export default ReaderModal;
