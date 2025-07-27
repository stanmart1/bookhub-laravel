import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Typography } from '@mui/material';

const fetchStreaks = async () => {
  const { data } = await axios.get('/api/analytics/reading-streaks');
  return data.streaks;
};

const ReadingStreaks = () => {
  const { data: streaks, isLoading, isError } = useQuery(['readingStreaks'], fetchStreaks);

  if (isLoading) return <div>Loading streaks...</div>;
  if (isError) return <div>Error loading streaks.</div>;

  if (!streaks) return <div>No streak data available.</div>;

  return (
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="h6">Current Streak</Typography>
          <Typography>{streaks.current_streak} days</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="h6">Longest Streak</Typography>
          <Typography>{streaks.longest_streak} days</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export default ReadingStreaks;
