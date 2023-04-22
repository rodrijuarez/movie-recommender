import './App.css';
import React, { useState } from 'react';
import theme from './theme';
import { ThemeProvider, styled } from '@mui/material/styles';
import { TextField, Button, Typography } from '@mui/material';
// import { TextField, Button, Typography, Select } from '@mui/material'; //porque estoy queriendo hacerlo funcionar y pensaba que el issue era con el select de MUI, pero no je
import axios from 'axios';
import Select, { StylesConfig } from 'react-select';
// import makeAnimated from 'react-select/animated'; //porque quiero probarlo luego je

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
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
  fontWeight: 'bold',
  textAlign: 'center',
  marginLeft: '1rem',
  marginRight: '1rem',
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
  fontSize: '1rem',
  marginLeft: '4rem',
  marginRight: '4rem',
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
  const [option, setOption] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  }

  const handleSubmit = event => {
    setClick(true);
    /* I couldnt fix this issue, after selecting an option, got this:
          TypeError: Cannot read properties of undefined (reading 'value')*/
    setOption(event.target.value); //The error occurs with this
    setRecommendations(null);
    event.preventDefault();
    console.log(option + " selected: " + value);

    const optionEndpoint = 
      value === 'movie' ? 'movie-recommendations' :
      value === 'actor' ? 'actor-recommendations' :
      'recommendations'; // default value === 'director' ? 'recommendations';
  
    axios.get(`http://localhost:3001/${optionEndpoint}`, {
      params: {
        optionSelected: value
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
                  <div>`"{rec.movie}" by {rec.director}`</div>
                  <a href={rec.director}>Ver Trailer</a>
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

