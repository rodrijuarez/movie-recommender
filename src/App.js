import './App.css';
import React from 'react';
import theme from './theme';
import { ThemeProvider, styled } from '@mui/material/styles';
import { TextField, Button, Typography } from '@mui/material';

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  color: theme.palette.text.secondary,
}));

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Label = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  color: '#ffffff',
}));

const Input = styled(TextField)(({ theme }) => ({
  marginBottom: '1rem',
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
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
          <Input id="director-name" name="director-name" variant="outlined" required />
          <SubmitButton type="submit">Submit</SubmitButton>
        </Form>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
