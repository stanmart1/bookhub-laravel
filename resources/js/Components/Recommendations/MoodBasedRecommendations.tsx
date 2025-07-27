import React from 'react';
import { ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';

const MoodBasedRecommendations = () => {
  const [mood, setMood] = React.useState('adventurous');

  const handleMoodChange = (event, newMood) => {
    setMood(newMood);
  };

  return (
    <div>
      <Typography variant="h6">What's your mood?</Typography>
      <ToggleButtonGroup
        color="primary"
        value={mood}
        exclusive
        onChange={handleMoodChange}
      >
        <ToggleButton value="adventurous">Adventurous</ToggleButton>
        <ToggleButton value="thought-provoking">Thought-Provoking</ToggleButton>
        <ToggleButton value="lighthearted">Lighthearted</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default MoodBasedRecommendations;
