import React, { useState } from 'react';
import axios from 'axios';

import './App.css';
import Home from './Home';
import HorizontalLoginForm from './HorizontalLoginForm';
import WrappedRegistrationForm from './WrappedRegistrationForm';


axios.defaults.baseURL = 'https://6dbb1786.ngrok.io/api';


function App() {
  const [page, setPage] = useState('home');
  const changePage = (page) => {
    setPage(page)
  }
  if(page === 'home') {
    return (<Home changePage={changePage} />)
  }
  if(page === 'login') {
    return (<HorizontalLoginForm changePage={changePage} />)
  }
  if(page === 'signin') {
    return (<WrappedRegistrationForm changePage={changePage} />)
  }
}

export default App;
