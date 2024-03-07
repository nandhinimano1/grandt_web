import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9c27b0',
      contrastText: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlinedPrimary: {
          border: `1px solid #9c27b0`,
          '&:hover': {
            border: `1px solid #7b1fa2`,
            backgroundColor: 'transparent',
          },
          color: '#9c27b0',
        },
        containedPrimary: {
          backgroundColor: '#9c27b0',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#7b1fa2',
          },
        },
      },
    },
  },
});

export default theme;
