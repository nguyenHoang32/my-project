import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import DashboardAction from "./DashboardAction";
import ExperienceTable from "./ExperienceTable";
import EducationTable from "./EducationTable";

import { connect } from "react-redux";
import { getCurrentProfile } from "../../action/profile";
import { loadUser } from "../../action/auth";

import { makeStyles } from "@material-ui/core";
import { Grid, Typography, Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  table: {
    "& .MuiTypography-root": {
      marginBottom: "2em",
    },
  },
  head: {
    "& .MuiTableCell-head": {
      backgroundColor: theme.palette.common.light,
      borderRight: "3px solid white",
      fontWeight: "bold",
    },
  },
  btn: {
    backgroundColor: theme.palette.error.main,
    padding: "8px 16px 8px 16px",
    fontSize: "1.1rem",
    fontWeight: "100",
    color: "white",
    borderRadius: "2px",
    border: "none",
    "&:hover": {
      opacity: 0.9,
      cursor: "pointer",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.9rem",
    },
  },
  credentials: {
    fontSize: "1.6rem",
    fontWeight: "400",
  },
  marginBottom: {
    ...theme.marginBottom,
  },
  delete: {
    backgroundColor: theme.palette.common.danger,
    marginTop: "1em",
    color: "white",
    opacity: 0.8,
    "&:hover": {
      opacity: 1,
      backgroundColor: theme.palette.common.danger,
    },
  },
}));

function Dashboard({
  auth,
  profile: { profile, isLoading },
  getCurrentProfile,
  loadUser,
}) {
  const classes = useStyles();
  const { user } = auth;
  useEffect(() => {
    loadUser();
    getCurrentProfile();
  }, [getCurrentProfile, loadUser]);
  return (
    <Grid container direction="column" spacing={3}>
      <React.Fragment>
        <Grid item>
          <Typography variant="h3" color="primary">
            Dashboard
          </Typography>

          <Typography variant="h5" style={{ fontWeight: "normal" }}>
            <i className="fa fa-user"></i>
            Welcome {user && user.name}
          </Typography>

          {JSON.stringify(profile) !== JSON.stringify({}) ? (
            <Grid item className={classes.marginBottom}>
              <DashboardAction />
              {!isLoading && profile.education.length > 0 && (
                <EducationTable
                  education={profile.education}
                  classes={classes}
                />
              )}
              {!isLoading && profile.experience.length > 0 && (
                <ExperienceTable
                  experience={profile.experience}
                  classes={classes}
                />
              )}
            </Grid>
          ) : (
            <Grid item className={classes.marginBottom}>
              <Typography>
                You have not yet setup a profile, please add some info
              </Typography>
              <Button
                component={Link}
                to="/create-profile"
                variant="outlined"
                color="primary"
              >
                Create Profile
              </Button>
            </Grid>
          )}
          
        </Grid>
      </React.Fragment>
    </Grid>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile, loadUser })(
  Dashboard
);
