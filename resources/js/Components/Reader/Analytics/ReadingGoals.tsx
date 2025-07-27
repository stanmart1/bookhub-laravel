import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, Typography, Button, TextField, Select, MenuItem } from '@mui/material';

const createReadingGoal = async (goal) => {
  const { data } = await axios.post('/api/analytics/reading-goals', goal);
  return data.goal;
};

const ReadingGoals = ({ goal, progress }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(createReadingGoal, {
    onSuccess: () => {
      queryClient.invalidateQueries(['readingGoals']);
    },
  });
  const [type, setType] = useState('pages');
  const [target, setTarget] = useState(100);
  const [duration, setDuration] = useState('weekly');

  const handleSave = () => {
    mutation.mutate({ type, target, duration });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Reading Goal</Typography>
        <Typography>
          {`You've read ${progress} of your ${goal} pages goal this week.`}
        </Typography>
        <div>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <MenuItem value="pages">Pages</MenuItem>
            <MenuItem value="books">Books</MenuItem>
            <MenuItem value="minutes">Minutes</MenuItem>
          </Select>
          <TextField
            type="number"
            value={target}
            onChange={(e) => setTarget(parseInt(e.target.value, 10))}
          />
          <Select value={duration} onChange={(e) => setDuration(e.target.value)}>
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
          <Button onClick={handleSave} disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Saving...' : 'Set New Goal'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

ReadingGoals.defaultProps = {
  goal: 100,
  progress: 60,
};

export default ReadingGoals;
