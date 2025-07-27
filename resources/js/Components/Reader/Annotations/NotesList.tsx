import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const NotesList = ({ notes }) => {
  return (
    <div>
      <Typography variant="h6">Notes</Typography>
      {notes.map((note, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>{`Note on page ${note.page}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{note.text}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

NotesList.defaultProps = {
  notes: [
    { text: 'This is my note about this highlight.', page: 10 },
    { text: 'I should remember this for later.', page: 25 },
  ],
};

export default NotesList;
