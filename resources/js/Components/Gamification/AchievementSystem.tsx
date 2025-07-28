import React from 'react';
import { Dialog, DialogTitle, DialogContent, Grid, Card, CardContent, Typography } from '@mui/material';

const achievements = [
  { title: 'First Purchase', description: 'Make your first purchase' },
  { title: 'Bookworm', description: 'Read 10 books' },
  { title: 'Critic', description: 'Write 5 book reviews' },
];

const AchievementSystem = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Achievements</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {achievements.map((achievement, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{achievement.title}</Typography>
                  <Typography variant="body2">{achievement.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementSystem;
