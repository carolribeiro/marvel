import React from 'react';
import { HashRouter } from 'react-router-dom';
import Header from '../templates/Header';
import Footer from '../templates/Footer';
import Routes from './Routes';

export default props => (
  <HashRouter>
      <Header/>
      <Routes />
      <Footer />
  </HashRouter>
)


