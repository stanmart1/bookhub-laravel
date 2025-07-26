import React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';

interface CardWithActionsProps {
    title: string;
    content: string;
    actions: {
        label: string;
        onClick: () => void;
    }[];
}

const CardWithActions = ({ title, content, actions }: CardWithActionsProps) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
            </CardContent>
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
