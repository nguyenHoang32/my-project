import React from "react";
import { Link } from 'react-router-dom';

import { makeStyles } from "@material-ui/core";
import { Grid, Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  action: {
    float: 'left',
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      "& .MuiGrid-item": {
        padding: "1px",
        "& .MuiButton-outlined": {
          width: "100%",
          justifyContent: "flex-start",
        },
      },
      justifyContent: "flex-start",
    },
  },
  icon: {
    color: "#17a2b8"
  }
}))
const DashboardAction = () => {
  const classes = useStyles();
  return (
    <Grid item>
    <Grid container spacing={2} direction="row" className={classes.action}>
      <Grid item>
        <Button variant="outlined" component={Link} to="/edit-profile">
          <i className={`fa fa-user ${classes.icon}`}></i>
          Update Profile
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" component={Link} to="/add-experience">
          <i className={`fa fa-black-tie ${classes.icon}`}></i>
          Add Experience
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" component={Link} to="/add-education">
          <i className={`fa fa-graduation-cap ${classes.icon}`}></i>
          Add Education
        </Button>
      </Grid>
    </Grid>
    </Grid>
  );
};
export default DashboardAction;
