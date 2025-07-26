import React from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar, Typography, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import QuantitySelector from './QuantitySelector';

interface CartItemProps {
    item: {
        id: number;
        title: string;
        author: string;
        cover_image: string;
        price: number;
        quantity: number;
    };
}

const CartItem = ({ item }: CartItemProps) => {
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete">
                    <Delete />
                </IconButton>
            }
        >
            <ListItemAvatar>
                <Avatar alt={item.title} src={item.cover_image} />
            </ListItemAvatar>
            <ListItemText
                primary={item.title}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'block' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {item.author}
                        </Typography>
                        {`$${item.price.toFixed(2)}`}
                    </React.Fragment>
                }
            />
            <QuantitySelector quantity={item.quantity} onQuantityChange={() => {}} />
        </ListItem>
    );
};

export default CartItem;
