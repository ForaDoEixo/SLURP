import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';

import './App.css';
import './typography';

import store from './store'

import Layout from './components/layout'

const App = () => (
  <Provider store={store}>
      <Router>
          <Layout/>
      </Router>
  </Provider>
)

export default App;
