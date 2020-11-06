import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { logout } from '../../action/auth'

import { List, ListItem, Typography, makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    opacity: 0.9,
    position: "fixed",
    top: 0,
    zIndex: 1,
    width: "100%",
    height: "auto",
    justifyContent: "space-between",
    paddingLeft: "2em",
    paddingRight: "2em",
    backgroundColor: theme.palette.common.dark,
    borderBottom: `1px solid ${theme.palette.common.primary}`,
    "& a": {
      color: "white",
      textDecoration: "none",
    },
    [theme.breakpoints.down("md")]: {
      display: "block",
      paddingTop: "1em",
    },
  },
  logo: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
    fontWeight: "bold",
    "& i": {
      fontWeight: "bold",
      fontSize: "1.8rem",
    },
  },
  list: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiListItem-root": {
      color: "white",
      fontSize: "1rem",
      [theme.breakpoints.down("md")]: {
        justifyContent: "center",
      },
    },
  },
}));

function Navbar({isAuth, logout}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <nav className={classes.navbar}>
        <Typography variant="h5" align="center" className={classes.logo}>
          <Link to="/" rel="shortcut icon">
            <i className="fa fa-code" rel="shortcut icon"></i>
            DevConnector
          </Link>
        </Typography>
        <List className={classes.list}>
        { isAuth ?  
        (<React.Fragment>
        <ListItem button component={Link} to="/profiles">Developers</ListItem>
        <ListItem button component={Link} to="/posts">Posts</ListItem>
        <ListItem button component={Link} to="/dashboard">
        <i className="fa fa-user" aria-hidden="true"></i>
          Dashboard
          </ListItem>
        <ListItem button onClick={() => logout()}>
        <i className="fa fa-sign-out" aria-hidden="true"></i>
          Logout
          </ListItem>
        </React.Fragment>) : (
          <React.Fragment>
          <ListItem button component={Link} to="/profiles">Developers</ListItem>
          <ListItem button component={Link} to="/register">Register</ListItem>
          <ListItem button component={Link} to="/login">Login</ListItem>
        </React.Fragment> 
        ) }
        </List>
      </nav>
    </React.Fragment>
  );
}
const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
})
Navbar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
}
export default connect(mapStateToProps, {logout})(Navbar);