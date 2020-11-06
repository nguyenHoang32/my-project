import React from "react";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Landing from '../components/landing';
import MyAlert from '../components/layout/Alert';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Posts from '../components/posts';
import Post from '../components/post';
import Profiles from '../components/profiles';
import Profile from '../components/profile/Profile';
import Dashboard from '../components/dashboard';
import ProfileForm from '../components/profile-form/ProfileForm/index';
import AddEducation from '../components/profile-form/AddEducation';
import AddExperience from '../components/profile-form/AddExperience';
// import NotFound from '../components/notfound'

import { makeStyles } from "@material-ui/core";
import { Container } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "80%",
    marginTop: "6em",
    [theme.breakpoints.down("md")]: {
      marginTop: "8em",
      width: "90%",
    },
  main: {
    backgroundColor: 'white'
  }
  },
}));
const Routes = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Switch>
      <Route path="/" exact component={Landing} /> 
        <>
          <div className={classes.main}>

          
          <Container className={classes.container} maxWidth="lg">
          
          <MyAlert />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/create-profile" component={ProfileForm} />
          <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
          <PrivateRoute exact path="/add-experience" component={AddExperience} />
          <PrivateRoute exact path="/add-education" component={AddEducation} />
          <PrivateRoute exact path="/posts" component={Posts} />
          <PrivateRoute exact path="/posts/:id" component={Post} />
          {/* <Route exact component={NotFound} /> */}
          </Container>
     
          </div>
          </>
        </Switch>
      
    </React.Fragment>
  );
};
export default Routes;