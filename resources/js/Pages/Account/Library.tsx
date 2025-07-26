import React from 'react';
import { Container, Typography, ImageList, ImageListItem } from '@mui/material';
import AppLayout from '../../Layouts/AppLayout';

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
];

const Library = () => {
    return (
        <AppLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    My Library
                </Typography>
                <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={164}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Container>
        </AppLayout>
    );
};

export default Library;
