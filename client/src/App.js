import React, { useEffect } from "react";
import setAuthToken from './uliti/setAuthToken';
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './route/Routes'

import { connect } from 'react-redux';
import { loadUser } from './action/auth';

import Navbar from "./components/layout/Navbar";

import theme from "./theme.js";
import { CssBaseline } from "@material-ui/core";

import { ThemeProvider } from "@material-ui/core/styles";

function App({loadUser}) {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    loadUser();
  }, [loadUser])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default connect(null, {loadUser})(App);
