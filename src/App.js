import React, { useState } from 'react';
import axios from 'axios';

import './App.css';
import Home from './Home';
import HorizontalLoginForm from './HorizontalLoginForm';
import WrappedRegistrationForm from './WrappedRegistrationForm';


axios.defaults.baseURL = 'http://192.168.1.11:8000/api';


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
  // return (    
      // <BrowserRouter>
      //   <Route exact path="/" component={Home}/>
      //   <Route exact path="/login" component={HorizontalLoginForm}/>
      //   <Route exact path="/signin" component={WrappedRegistrationForm}/>
      // </BrowserRouter>
  // );
}

export default App;
