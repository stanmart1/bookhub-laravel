import React from 'react';
import { Fab } from '@mui/material';
import { Mic } from '@mui/icons-material';

const VoiceSearch = ({ onStart, onStop }) => {
  const [isListening, setIsListening] = React.useState(false);

  const handleClick = () => {
    if (isListening) {
      onStop();
    } else {
      onStart();
    }
    setIsListening(!isListening);
  };

  return (
    <Fab color={isListening ? 'secondary' : 'primary'} onClick={handleClick}>
      <Mic />
    </Fab>
  );
};

export default VoiceSearch;
