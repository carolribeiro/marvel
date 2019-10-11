import React from 'react';
import { HashRouter } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import Routes from './Routes';

export default props => (
  <HashRouter>
    <Header/>
    <Routes />
    <Footer />
  </HashRouter>
)


