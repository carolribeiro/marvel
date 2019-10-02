import React from 'react';
import { HashRouter } from 'react-router-dom';
import Home from './Home';
import Footer from '../templates/Footer';

export default props => (
  <HashRouter>
      <Home/>
      <Footer />
  </HashRouter>
)


