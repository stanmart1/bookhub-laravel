import React from 'react';
import { Box, IconButton, Pagination, Typography } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const PageNavigation = ({ page, count, onChange }) => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: 2,
    }}>
      <IconButton onClick={() => onChange(page - 1)} disabled={page <= 1}>
        <ArrowBack />
      </IconButton>
      <Pagination
        count={count}
        page={page}
        onChange={(e, value) => onChange(value)}
        variant="outlined"
        shape="rounded"
        hidePrevButton
        hideNextButton
      />
      <IconButton onClick={() => onChange(page + 1)} disabled={page >= count}>
        <ArrowForward />
      </IconButton>
    </Box>
  );
};

export default PageNavigation;
