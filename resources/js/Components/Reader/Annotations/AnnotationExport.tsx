import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem } from '@mui/material';

const AnnotationExport = ({ open, onClose, onExport }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Export Annotations</DialogTitle>
      <DialogContent>
        <Select defaultValue="pdf" fullWidth>
          <MenuItem value="pdf">PDF</MenuItem>
          <MenuItem value="csv">CSV</MenuItem>
          <MenuItem value="txt">Text File</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onExport}>Export</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnnotationExport;
