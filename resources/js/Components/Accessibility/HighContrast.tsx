import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const highContrastTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#ffff00',
    },
    background: {
      default: '#000000',
      paper: '#000000',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffff00',
    },
  },
});

const HighContrast = ({ children }) => {
  return <ThemeProvider theme={highContrastTheme}>{children}</ThemeProvider>;
};

export default HighContrast;
