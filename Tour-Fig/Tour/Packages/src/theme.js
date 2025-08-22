// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFA500',         // orange hex
      contrastText: '#fff',    // white text on orange
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#FA8B02',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#e69500',
          },
        },
      },
    },
  },
});

export default theme;
