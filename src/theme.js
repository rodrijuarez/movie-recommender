import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  backgroundColor: '#111',
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
      dark: '#0d8aed',
      contrastText: '#ffffff',
    },
    background: {
      default: '#161519',
      paper: '#333',
    },
    text: {
      primary: '#fff',
      secondary: '#bdbdbd',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
  },
});

export default theme;
