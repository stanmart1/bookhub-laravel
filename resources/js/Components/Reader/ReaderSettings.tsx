import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box,
  Button,
  DialogActions,
} from '@mui/material';
import FontSettings from './Settings/FontSettings';
import ThemeSettings from './Settings/ThemeSettings';
import LayoutSettings from './Settings/LayoutSettings';
import BehaviorSettings from './Settings/BehaviorSettings';
import AccessibilitySettings from './Settings/AccessibilitySettings';
import AdvancedSettings from './Settings/AdvancedSettings';

const fetchSettings = async () => {
  const { data } = await axios.get('/api/reader/settings');
  return data.settings;
};

const updateSettings = async (settings) => {
  const { data } = await axios.post('/api/reader/settings', settings);
  return data.settings;
};

const ReaderSettings = ({ open, onClose }) => {
  const queryClient = useQueryClient();
  const { data: settings, isLoading, isError } = useQuery(['readerSettings'], fetchSettings);
  const mutation = useMutation(updateSettings, {
    onSuccess: () => {
      queryClient.invalidateQueries(['readerSettings']);
      onClose();
    },
  });
  const [value, setValue] = React.useState(0);
  const [formState, setFormState] = React.useState(settings || {});

  React.useEffect(() => {
    setFormState(settings || {});
  }, [settings]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSettingChange = (setting, value) => {
    setFormState(prev => ({ ...prev, [setting]: value }));
  };

  const handleSave = () => {
    mutation.mutate(formState);
  };

  if (isLoading) return <div>Loading settings...</div>;
  if (isError) return <div>Error loading settings.</div>;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Reader Settings</DialogTitle>
      <DialogContent>
        <Tabs value={value} onChange={handleChange} aria-label="reader settings tabs">
          <Tab label="Font" />
          <Tab label="Theme" />
          <Tab label="Layout" />
          <Tab label="Behavior" />
          <Tab label="Accessibility" />
          <Tab label="Advanced" />
        </Tabs>
        <Box sx={{ mt: 2 }}>
          {value === 0 && <FontSettings settings={formState} onChange={handleSettingChange} />}
          {value === 1 && <ThemeSettings settings={formState} onChange={handleSettingChange} />}
          {value === 2 && <LayoutSettings settings={formState} onChange={handleSettingChange} />}
          {value === 3 && <BehaviorSettings settings={formState} onChange={handleSettingChange} />}
          {value === 4 && <AccessibilitySettings settings={formState} onChange={handleSettingChange} />}
          {value === 5 && <AdvancedSettings settings={formState} onChange={handleSettingChange} />}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReaderSettings;
