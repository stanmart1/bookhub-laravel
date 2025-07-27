import React from 'react';
import { Rating, Typography, Box } from '@mui/material';

const RecommendationFeedback = () => {
  const [value, setValue] = React.useState(2);

  return (
    <Box>
      <Typography component="legend">How would you rate this recommendation?</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
  );
};

export default RecommendationFeedback;
