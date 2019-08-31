import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import Home from './Home';
import HorizontalLoginForm from './HorizontalLoginForm';
import WrappedRegistrationForm from './WrappedRegistrationForm';


axios.defaults.baseURL = 'http://192.168.1.11:8000/api';


function App() {
  return (
      <BrowserRouter>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={HorizontalLoginForm}/>
        <Route exact path="/signin" component={WrappedRegistrationForm}/>
      </BrowserRouter>
  );
}

export default App;
