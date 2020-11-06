import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import myReducers from './reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { CssBaseline } from '@material-ui/core';

const middleware = [thunk];
const store = createStore(myReducers, composeWithDevTools(
  applyMiddleware(...middleware),
  
  ));
ReactDOM.render(
  <Provider store={store}>
  <CssBaseline />
    <App />
  </Provider>,
  document.getElementById('root')
);

