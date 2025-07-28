import React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';

const SearchHistory = ({ history }) => {
  return (
    <Timeline>
      {history.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>{item.query}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default SearchHistory;
