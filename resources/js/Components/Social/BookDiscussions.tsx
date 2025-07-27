import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';

const BookDiscussions = ({ discussions }) => {
  return (
    <List>
      {discussions.map((discussion, index) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={discussion.title}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {discussion.author}
                  </Typography>
                  {` — ${discussion.excerpt}`}
                </React.Fragment>
              }
            />
          </ListItem>
          {index < discussions.length - 1 && <Divider variant="inset" component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
};

BookDiscussions.defaultProps = {
  discussions: [
    {
      title: 'What did you think of the ending?',
      author: 'Charlie',
      excerpt: 'I was so surprised by the plot twist...',
    },
    {
      title: 'Favorite character?',
      author: 'Diana',
      excerpt: 'I really loved the protagonist...',
    },
  ],
};

export default BookDiscussions;
