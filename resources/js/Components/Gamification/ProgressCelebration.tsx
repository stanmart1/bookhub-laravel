import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ProgressCelebration = ({ open, onClose, achievement }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Typography variant="h4" align="center">
            Achievement Unlocked!
          </Typography>
          <Typography variant="h6" align="center">
            {achievement.title}
          </Typography>
          <Typography variant="body1" align="center">
            {achievement.description}
          </Typography>
        </motion.div>
      </Box>
    </Modal>
  );
};

export default ProgressCelebration;
