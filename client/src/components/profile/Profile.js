import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import ExperienceItem from "./ExperienceItem";
import EducationItem from "./EducationItem";
import Repos from "./Repos";

import { connect } from "react-redux";
import { getProfileById } from "../../action/profile";

import { makeStyles } from "@material-ui/core";
import { Grid, Paper, Typography, Button, Divider } from "@material-ui/core";

import LanguageIcon from "@material-ui/icons/Language";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const useStyles = makeStyles((theme) => ({
  top: {
    backgroundColor: theme.palette.common.primary,
    color: "white",
    textAlign: "center",
    padding: "2.5em",
    marginBottom: "2em",
  },
  mid: {
    backgroundColor: theme.palette.common.light,
    border: `1px solid ${theme.palette.common.border}`,
    textAlign: "center",
    padding: "1.5em",
    marginBottom: "2em",
  },
  skills: {
    display: "flex",
    justifyContent: "center",
    "& li": {
      marginLeft: "2em",
    },
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  gridItem: {
    border: `1px solid ${theme.palette.common.border}`,
    padding: "1.5em",
    height: "100%",
  },
  editBtn: {
    backgroundColor: theme.palette.common.dark,
    color: 'white',
    opacity: 0.9,
    marginLeft: '1em',
    '&:hover': {
      opacity: 1,
      backgroundColor: theme.palette.common.dark,

    }
  }
}));
function Profile({ getProfileById, match, profile: { isLoading, profile } }) {
  const classes = useStyles();
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params]);
  if (isLoading || !profile.user) return <Typography variant="h3">Loading...</Typography>;
  const {
    user,
    status,
    website,
    company,
    location,
    education,
    experience,
    bio,
    
    skills,
  } = profile;
 
  return (
    <React.Fragment>
      
      <Typography gutterBottom>
        <Button variant="contained" component={Link} to="/profiles" startIcon={<KeyboardBackspaceIcon />}>
          Back To Profiles
        </Button>
        <Button 
        component={Link}
        to="/edit-profile" 
        variant="contained"
        className={classes.editBtn}
        >Edit Profile</Button>
      </Typography>
      <div className={classes.top}>
        {user && <React.Fragment>
          <div>
          <img
            src={user && user.avatar}
            style={{ borderRadius: "50%", height: "17em" }}
            alt=""
          />
        </div>
        <Typography variant="h2" paragraph style={{ fontWeight: "500" }}>
          {user.name}
        </Typography>
        </React.Fragment>}
        <Typography paragraph variant="h5">
          {status} {company && `at ${company}`}
        </Typography>
        <Typography paragraph variant="body1">
          {location}
        </Typography>
        <a href={website} target="_blank" title={website} rel="noopener noreferrer">
          <LanguageIcon style={{fontSize: '3em', color: 'white'}}/>
        </a>
        
      </div>
      <Paper className={classes.mid}>
        <Typography variant="h4" color="primary" paragraph>
          {user && user.name}'s Bio
        </Typography>
        <Typography variant="subtitle1">{bio ? "No bio" : bio}</Typography>
        <Divider variant="middle" style={{ margin: "3em 0px 3em 0px" }} />
        <Typography variant="h4" color="primary" paragraph>
          Skill Set
        </Typography>
        <ul className={classes.skills}>
          {skills.map((skill, index) => (
            <li key={index}>
              <Typography variant="subtitle1">
                <i className="fa fa-check"></i>
                {skill}
              </Typography>
            </li>
          ))}
        </ul>
      </Paper>
      <Grid
        container
        spacing={2}
        style={{ marginBottom: "2em" }}
        alignItems="stretch"
        direction="row"
        justify="flex-start"
      >
        <Grid item md={6} xs={12}>
          <div className={classes.gridItem}>
            <Typography variant="h4" paragraph color="primary">
              Experience
            </Typography>
            {experience.length > 0 ? (
              experience.map((item, index) => (
                <ExperienceItem
                  key={index}
                  experience={item}
                  classes={classes}
                />
              ))
            ) : (
              <Typography>No experience to display</Typography>
            )}
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
          <div className={classes.gridItem}>
            <Typography variant="h4" paragraph color="primary">
              Education
            </Typography>
            {education.length > 0 ? (
              education.map((item, index) => (
                <EducationItem key={index} education={item} classes={classes} />
              ))
            ) : (
              <Typography>No education to display</Typography>
            )}
          </div>
        </Grid>
      </Grid>
      <Typography variant="h4" color="primary">
        <i className="fa fa-github"></i> Github Repos
      </Typography>
      <Repos classes={classes} />
    </React.Fragment>
  );
}
const mapState = (state) => ({
  profile: state.profile,
});
export default connect(mapState, { getProfileById })(Profile);
