import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, ListItemText } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const GenreRecommendations = ({ recommendations }) => {
  return (
    <div>
      {recommendations.map((rec, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>{rec.genre}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {rec.books.map((book, bookIndex) => (
                <ListItem key={bookIndex}>
                  <ListItemText primary={book.title} secondary={book.author} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

GenreRecommendations.defaultProps = {
  recommendations: [
    {
      genre: 'Fantasy',
      books: [
        { title: 'A Game of Thrones', author: 'George R.R. Martin' },
        { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
      ],
    },
    {
      genre: 'Science Fiction',
      books: [
        { title: 'Dune', author: 'Frank Herbert' },
        { title: 'Neuromancer', author: 'William Gibson' },
      ],
    },
  ],
};

export default GenreRecommendations;
