import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';

const fetchCollections = async () => {
  const { data } = await axios.get('/api/library/collections');
  return data.collections;
};

const LibraryGrid = () => {
  const { data: collections, isLoading, isError } = useQuery(['collections'], fetchCollections);

  if (isLoading) return <div>Loading library...</div>;
  if (isError) return <div>Error loading library.</div>;

  return (
    <div>
      {collections.map((collection) => (
        <div key={collection.id}>
          <Typography variant="h6">{collection.name}</Typography>
          <ImageList cols={3}>
            {collection.books.map((book) => (
              <ImageListItem key={book.id}>
                <img
                  src={`${book.cover_image}?w=248&fit=crop&auto=format`}
                  srcSet={`${book.cover_image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={book.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={book.title}
                  subtitle={<span>by: {book.author}</span>}
                  position="below"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      ))}
    </div>
  );
};

export default LibraryGrid;
