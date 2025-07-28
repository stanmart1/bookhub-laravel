import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', books: 4 },
  { name: 'Feb', books: 3 },
  { name: 'Mar', books: 5 },
  { name: 'Apr', books: 4 },
  { name: 'May', books: 6 },
  { name: 'Jun', books: 5 },
];

const ReadingStats = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Monthly Reading Statistics
        </Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="books" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReadingStats;
