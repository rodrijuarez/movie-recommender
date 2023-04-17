import './App.css';
import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, Button, Typography } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
      dark: '#0d8aed',
    },
  },
});

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

const Title = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
});

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const Label = styled(Typography)({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
});

const Input = styled(TextField)({
  marginBottom: '1rem',
  border: '1px solid #111',
});

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginTop: '1rem',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Title variant="h1">Movie Recommender</Title>
        <Form>
          <Label htmlFor="director-name">Name of Movie's director that you like:</Label>
          <Input id="director-name" name="director-name" required />
          <SubmitButton type="submit">Submit</SubmitButton>
        </Form>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
