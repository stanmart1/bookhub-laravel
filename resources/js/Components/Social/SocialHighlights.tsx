import React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { Typography, Paper } from '@mui/material';

const SocialHighlights = ({ highlights }) => {
  return (
    <Timeline position="alternate">
      {highlights.map((highlight, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            {highlight.date}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" component="span">
                {highlight.user}
              </Typography>
              <Typography>highlighted in "{highlight.book}"</Typography>
              <Typography>"{highlight.text}"</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

SocialHighlights.defaultProps = {
  highlights: [
    {
      user: 'Alice',
      book: 'The Hobbit',
      text: 'In a hole in the ground there lived a hobbit.',
      date: '2023-01-10',
    },
    {
      user: 'Bob',
      book: '1984',
      text: 'It was a bright cold day in April, and the clocks were striking thirteen.',
      date: '2023-01-12',
    },
  ],
};

export default SocialHighlights;
