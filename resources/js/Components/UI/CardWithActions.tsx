import React from 'react';
import { Card, CardContent, CardActions, Button } from '@mui/material';

const CardWithActions = ({ children, actions }) => {
  return (
    <Card>
      <CardContent>{children}</CardContent>
      <CardActions>
        {actions.map((action, index) => (
          <Button key={index} size="small" onClick={action.onClick}>
            {action.label}
          </Button>
        ))}
      </CardActions>
    </Card>
  );
};

export default CardWithActions;
