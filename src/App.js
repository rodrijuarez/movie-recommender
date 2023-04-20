import './App.css';
import React from 'react';
import theme from './theme';
import { ThemeProvider, styled } from '@mui/material/styles';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

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

const Label = styled('label')(({ theme }) => ({
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

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('myRequest: ' + this.state.value);
  
    axios.get('http://localhost:3001/recommendations', {
      params: {
        director: this.state.value
  //       curl --location --request GET "localhost:3000/recommendations?query=Linklater" \
  // --header "Content-Type: application/json"
      }
    })
    .then(response => {
      console.log(response.data);
      console.log(response.text);
      // Do something with the response data, such as update the state of the component
    })
    .catch(error => {
      console.error(error);
      // Handle any errors that occurred during the API call
    });
  }

  render() { 

    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Title variant="h1">Movie Recommender</Title>
          <Form onSubmit={this.handleSubmit}>
            <Label htmlFor="director-name">Name of Movie's director that you like:</Label>
            <Input
              id="director-name"
              name="director-name"
              variant="outlined"
              required
              value={this.state.value}
              onChange={this.handleChange}
            />
            <SubmitButton type="submit">Submit</SubmitButton>
          </Form>
        </Wrapper>
      </ThemeProvider>
    );
  }
}

export default App;
