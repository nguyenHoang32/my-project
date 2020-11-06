import React from 'react';
import { Link } from 'react-router-dom'
import { Grid, Paper, Hidden, Typography, Button  } from '@material-ui/core';
const ProfileItem = ({classes, profile}) => {
  const { user, status, skills, company, location } = profile;
  return(
    <Paper className={classes.profile}>
    <Grid container alignItems="center" className={classes.container} style={{textAlign: 'center'}}>
      <Grid item xs={12} md={3} style={{ textAlign: "center" }}>
        <img
          src={user.avatar}
          style={{ borderRadius: "50%", height: "16em" }}
          alt="avatar"
          component={Link}
          to={`/profile/${user._id}`}
        /> 
      </Grid>
      <Grid item md={6} xs={12}>
        <Typography variant="h4" gutterBottom>
          {user.name}
        </Typography>
  <Typography gutterBottom>{status} {company && `at ${company}`}</Typography>
  <Typography gutterBottom>{location}</Typography>
        <Button 
        variant="contained" 
        color="primary" 
        disableElevation
        component={Link}
        to={`/profile/${user._id}`}>
          View Profile
        </Button>
      </Grid>
      <Hidden mdDown>
        <Grid item md={3}>
          <ul>
            {skills.map((skill, index) => (<li key={index}><Typography color="primary"><i className="fa fa-check"></i>{skill}</Typography></li>))}
          </ul>
        </Grid>
      </Hidden>
    </Grid>
  </Paper>
  )
}
export default ProfileItem;