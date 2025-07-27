import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const fetchVocabularyGrowth = async () => {
  const { data } = await axios.get('/api/analytics/vocabulary-growth');
  return data.data;
};

const VocabularyGrowth = () => {
  const { data, isLoading, isError } = useQuery(['vocabularyGrowth'], fetchVocabularyGrowth);

  if (isLoading) return <div>Loading vocabulary growth...</div>;
  if (isError) return <div>Error loading vocabulary growth.</div>;

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Vocabulary Growth</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="words" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default VocabularyGrowth;
