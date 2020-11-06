import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { login } from '../../action/auth'

import { makeStyles } from '@material-ui/core';
import { Typography, Button, FormGroup, TextField } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  form: {
    "& .MuiOutlinedInput-root": {
      marginBottom: "1em",
    },
  },
  btn: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
}));

function SignIn({login, isAuth}) {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;
  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const onSubmit = e => {
    e.preventDefault();
    login({email, password});
  }
  if(isAuth) return <Redirect to="/dashboard" />
  return (
    <React.Fragment>
      <Typography color="primary" variant="h3">
        Sign In
      </Typography>
      <Typography
        variant="h6"
        style={{ fontWeight: "normal", marginBottom: "1em", marginTop: "1em" }}>
        <i className="fa fa-user"></i>
        Sign into Your Account
      </Typography>
      <form className={classes.form} onSubmit={onSubmit}>
        <FormGroup>
          <TextField 
          required
          type="email"
          label="Email" 
          variant="outlined" 
          name="email"
          value={email}
          onChange={onChange}
          />

          <TextField 
          required
          type="password"
          label="Password" 
          variant="outlined" 
          name="password"
          value={password}
          onChange={onChange}
          />
        </FormGroup>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.btn}>
          Login
        </Button>
        <Typography style={{ marginTop: "1em" }}>
          Don't have an account? <Button color="primary">Sign Up</Button>
        </Typography>
      </form>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})

SignIn.propTypes = {
  isAuth: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, {login})(SignIn);