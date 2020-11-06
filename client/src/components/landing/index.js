import React from 'react';
import style from './style.js'
import { Link } from 'react-router-dom'

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core';
import { Container, Button, Typography } from '@material-ui/core';
const useStyles = makeStyles(style);
function Landing({ auth: { isAuth, isLoading } }) {
  const classes = useStyles();
  if(isAuth){
    return <Redirect to="/dashboard" />
  }
  return (
    <div className={classes.landingContainer}>
      <div className={classes.overlay}>
        <Container className={classes.landingContent}>
          <Typography variant="h2" className={classes.title}>
            Developer Connector
          </Typography>
          <Typography className={classes.desc}>
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </Typography>
          <div className={classes.btnContainer}>
            <Button
              className={classes.btnSignUp}
              variant="contained"
              color="primary"
              component={Link}
              to="/register">
              Sign Up
            </Button>
            <Button 
            className={classes.btnLogin} 
            variant="contained"
            component={Link}
            to="/login">
              Login
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, null)(Landing);