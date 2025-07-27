import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Container, Grid } from '@mui/material';
import BookCard from '../../Components/Books/BookCard';

const fetchBooks = async () => {
  const { data } = await axios.get('/api/books');
  return data;
};

const Index = () => {
  const { data: books, isLoading, isError } = useQuery(['books'], fetchBooks);

  if (isLoading) return <div>Loading books...</div>;
  if (isError) return <div>Error loading books.</div>;

  return (
    <Container>
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Index;
