import React from 'react';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

const badges = [
  { img: 'https://via.placeholder.com/150', title: 'First Purchase' },
  { img: 'https://via.placeholder.com/150', title: 'Bookworm' },
  { img: 'https://via.placeholder.com/150', title: 'Critic' },
];

const BadgeCollection = () => {
  return (
    <ImageList cols={3}>
      {badges.map((badge, index) => (
        <ImageListItem key={index}>
          <img src={badge.img} alt={badge.title} />
          <ImageListItemBar title={badge.title} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default BadgeCollection;
