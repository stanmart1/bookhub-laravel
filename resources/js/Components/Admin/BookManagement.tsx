import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const fetchBooks = async () => {
  const { data } = await axios.get('/api/books');
  return data;
};

const BookManagement = () => {
  const { data: books, isLoading, isError } = useQuery(['books'], fetchBooks);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'author', headerName: 'Author', width: 150 },
  ];

  if (isLoading) return <div>Loading books...</div>;
  if (isError) return <div>Error loading books.</div>;

  return <DataGrid rows={books} columns={columns} />;
};

export default BookManagement;
