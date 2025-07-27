import React from 'react';
import { usePage } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Container, Card, CardContent, Typography } from '@mui/material';

const fetchBook = async (bookId) => {
  const { data } = await axios.get(`/api/books/${bookId}`);
  return data;
};

const Show = () => {
  const { props } = usePage();
  const { bookId } = props;
  const { data: book, isLoading, isError } = useQuery(['book', bookId], () => fetchBook(bookId));

  if (isLoading) return <div>Loading book...</div>;
  if (isError) return <div>Error loading book.</div>;

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4">{book.title}</Typography>
          <Typography variant="h6">{book.author}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Show;
