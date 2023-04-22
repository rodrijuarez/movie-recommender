import './App.css';
import React, { useState } from 'react';
import theme from './theme';
import { ThemeProvider, styled } from '@mui/material/styles';
import { TextField, Button, Typography } from '@mui/material';
import Select from 'react-select';
import axios from 'axios';

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  // height: 'align',
  backgroundColor: theme.palette.background.default,
  marginTop: '20px',
}));

const WrapperImage = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: 'align',
  marginTop: '20px',
}));

const Title = styled(Typography)(({ theme }) => ({
  // fontSize: '2rem',
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

const Label = styled('label')(({ theme }) => ({
  fontSize: '1.2rem',
  marginTop: '20px',
  color: '#ffffff',
}));

const Input = styled(TextField)(({ theme }) => ({
  marginTop: '20px',
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginTop: '20px',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Body = styled('div')(({ theme }) => ({
  fontSize: '1.2rem',
  color: '#ffffff',
  marginLeft: '4rem',
  marginRight: '4rem',
  marginTop: '20px',
}));

function App() {
  const [value, setValue] = useState('');
  const [click, setClick] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  const handleChange = event => {
    setValue(event.target.value);
  }

  const handleSubmit = event => {
    setClick(true);
    setRecommendations(null);
    event.preventDefault();
    console.log("Movie's Director: " + value);
  
    axios.get('http://localhost:3001/recommendations', {
      params: {
        director: value
      }
    })
    .then(response => {
      console.log(response.data);
      setRecommendations(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }

  const optionsSelect = [
    { value: 'director', label: 'Director' },
    { value: 'movie', label: 'Movie' },
    { value: 'actor', label: 'Actor' }
  ];

  return (
    <ThemeProvider theme={theme}>
      <WrapperImage>
        <img src={require('./img/watching-movie.png')} alt="logo" 
        width="100" height="100" className="logo"/>
      </WrapperImage>
      <Wrapper>
        <Title variant="h1">Movie Recommender</Title>
        <Form onSubmit={handleSubmit}>
        <Label htmlFor="option-select">
            Choose Movie, Actor or Director
          </Label>
          <Label htmlFor="director-name">
            Input one that you like, and I will recommend you movies:
          </Label>
          <Select id="option-select" name="option-select" options={optionsSelect} 
          // defaultValue={optionsSelect[0].value} 
          ></Select>
          <Input
            id="director-name"
            name="director-name"
            variant="outlined"
            required
            value={value}
            onChange={handleChange}
          />
          <SubmitButton type="submit">Submit</SubmitButton>
        </Form>
      </Wrapper>
      <Wrapper>
        {click && !recommendations && (
          <div marginTop="20px">
            <img src={require('./img/waiting.gif')} alt="loading..." 
            width="80" height="80" className="waiting-gif"/>
          </div>
        )}
        {recommendations && (
          <div>
            <Title variant="h2" align='center'>Recommendations</Title>
            <Body>
              {recommendations.map((rec, index) => (
                <div key={index}>
                  {rec.movie && (
                    <div>{rec.movie}</div>
                  )}
                  <div>{rec.director}</div>
                </div>
              ))}
            </Body>
          </div>
        )}
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;

