import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

const ContentUpload = ({ onUpload }) => {
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    setUploading(true);
    setProgress(0);

    const reader = new FileReader();
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentLoaded = Math.round((event.loaded / event.total) * 100);
        setProgress(percentLoaded);
      }
    };
    reader.onload = () => {
      onUpload(file);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            border: '2px dashed',
            borderColor: 'grey.300',
            borderRadius: 1,
            p: 3,
            textAlign: 'center',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'action.hover',
            },
          }}
        >
          <CloudUpload sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Drop files here or click to upload
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Supported formats: PDF, EPUB, MOBI
          </Typography>
          <input type="file" hidden onChange={handleUpload} />
        </Box>
        {uploading && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress variant="determinate" value={progress} />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Uploading... {progress}%
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentUpload;
