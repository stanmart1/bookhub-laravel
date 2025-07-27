import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { Typography, Paper } from '@mui/material';

const fetchSocialHighlights = async () => {
  const { data } = await axios.get('/api/social-highlights');
  return data;
};

const SocialHighlights = () => {
  const { data: highlights, isLoading, isError } = useQuery(['socialHighlights'], fetchSocialHighlights);

  if (isLoading) return <div>Loading social highlights...</div>;
  if (isError) return <div>Error loading social highlights.</div>;

  return (
    <Timeline position="alternate">
      {highlights.map((highlight) => (
        <TimelineItem key={highlight.id}>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            {new Date(highlight.created_at).toLocaleDateString()}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" component="span">
                {highlight.user.name}
              </Typography>
              <Typography>highlighted in "{highlight.highlight.book.title}"</Typography>
              <Typography>"{highlight.highlight.selected_text}"</Typography>
              <Typography variant="body2" color="text.secondary">{highlight.comment}</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default SocialHighlights;
