import React, { useEffect } from 'react';
import ProfileItem from './ProfileItem';

import { connect } from 'react-redux';
import { getProfiles } from '../../action/profile';


import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  profile: {
    border: `1px solid ${theme.palette.common.border}`,
    paddingTop: "1.2em",
    paddingBottom: "1.2em",
    backgroundColor: theme.palette.common.light,
    marginBottom: "1.5em",
  },
  container: {
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
}));
function Profiles({getProfiles, profile: { profiles, isLoading }}) {
  const classes = useStyles();
  useEffect(() => {
    getProfiles()
  }, [getProfiles])
  return (
    <React.Fragment>
      <Typography variant="h3" color="primary" paragraph>
        Developers
      </Typography>
      <Typography variant="h5" gutterBottom>
        Browse and connect with developers
      </Typography>
      { !isLoading && profiles.map((profile, index) => <ProfileItem classes={classes} profile={profile} key={index} />)}
    </React.Fragment>
  );
}
const mapState = state => ({
  profile: state.profile
})
export default connect(mapState , { getProfiles })(Profiles);