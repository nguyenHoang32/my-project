import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Link, Redirect } from "react-router-dom";



import { connect } from 'react-redux';
import { setAlert } from '../../action/alert';
import { register } from '../../action/auth';


import { makeStyles } from "@material-ui/core";
import { Typography, FormGroup, TextField, Button } from "@material-ui/core";
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
function Register({setAlert, register, isAuth}) {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      setAlert('Passwords do not match', 'error');
    }else{
      register({name, email, password});
    }
  };
  if(isAuth) return <Redirect to="/dashboard" />
  return (
    <React.Fragment>
      <Typography color="primary" variant="h3">
        Register
      </Typography>
      <Typography
        variant="h6"
        style={{ fontWeight: "normal", marginBottom: "1em", marginTop: "1em" }}>
        <i className="fa fa-user"></i>
        Create Your Account
      </Typography>
      <form className={classes.form} onSubmit={onSubmit}>
        <FormGroup>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            required
            value={name}
            onChange={onChange}
          />
          <TextField
            label="Email Address"
            variant="outlined"
            type="email"
            required
            style={{ marginBottom: "-1em" }}
            name="email"
            value={email}
            onChange={onChange}
          />
          <Typography variant="caption" style={{ marginBottom: "1em" }}>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </Typography>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            required
            name="password"
            value={password}
            onChange={onChange}
            min={6}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            required
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            min={6}
          />
        </FormGroup>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.btn}>
          Register
        </Button>
        <Typography style={{ marginTop: "1em" }}>
          Already have an account?{" "}
          <Button color="primary" component={Link} to="/login">
            Log In
          </Button>
        </Typography>
      </form>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired
}
export default connect(mapStateToProps, {setAlert, register})(Register);
