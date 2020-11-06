import React, { useState } from "react";

import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { addExpOrEdu } from '../../action/profile';

import { makeStyles } from "@material-ui/core";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: "0.8em",
    width: "100%",
  },
  noPadding: {
    paddingLeft: '0 !important',
  },
}));
const AddEducation = ({ addExpOrEdu, history }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    description,
    current,
  } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    addExpOrEdu(formData, history, 'education')
  }
  return(
    <React.Fragment>
      <Grid
        container
        direction="column"
        spacing={3}
        className={classes.container}
      >
        <Grid item className={classes.noPadding}>
          <Typography variant="h3" color="primary">
          Add Your Education
          </Typography>
        </Grid>
        <Grid item className={classes.noPadding}>
          <Typography variant="h5">
            <i className="fa fa-code-branch"></i>
            Add any school or bootcamp that you have attended
          </Typography>
        </Grid>
        <Grid item className={classes.noPadding}>
          * = Required Field
        </Grid>
        <form onSubmit={onSubmit}>
          <Grid item>
            <TextField
              label="* School or Bootcamp"
              fullWidth
              variant="outlined"
              className={classes.input}
              name="school"
              value={school}
              onChange={onChange}
              required
            />
          </Grid>
          <TextField
            label="* Degree or Certificate"
            fullWidth
            variant="outlined"
            className={classes.input}
            name="degree"
            value={degree}
            onChange={onChange}
            required
          />
          <Grid item>
            <TextField
              label="* Field of Study"
              fullWidth
              variant="outlined"
              className={classes.input}
              name="fieldofstudy"
              value={fieldofstudy}
              onChange={onChange}
              required
            />
          </Grid>
          <Grid item>
            <Typography variant="h6">* From Date</Typography>
            <input
              style={{ width: "100%", height: "3em" }}
              type="date"
              className={classes.input}
              name="from"
              value={from}
              onChange={onChange}
              required
            />
          </Grid>
          <Grid item>
            <input
              type="checkbox"
              name="current"
              className={classes.input}
              style={{ width: "auto" }}
              value={current}
              onChange={onChange}
            />
            <Typography variant="body1" display="inline">
              Current Job
            </Typography>
          </Grid>
          { Boolean(current) ? '' : 
          <Grid item>
            <Typography variant="h6">To Date</Typography>
            <input
              style={{ width: "100%", height: "3em" }}
              type="date"
              name="to"
              className={classes.input}
              value={to}
              onChange={onChange}
              disabled={Boolean(current)}
            />
          </Grid> }
          
          <Grid item>
            <textarea
              name="description"
              value={description}
              onChange={onChange}
              placeholder="Program Description"
              style={{ width: "100%", height: "4.5em", padding: "0.5em", fontSize: '1.3rem' }}
            />
          </Grid>
          <Grid item style={{marginTop: '1em'}}>
            <Button color="primary" variant="contained" style={{marginRight: '1em'}} type="submit">Send</Button>
            <Button variant="contained" component={Link} to='/dashboard'>Go Back</Button>
          </Grid>
        </form>
      </Grid>
    </React.Fragment>
  )
}
export default connect(null, { addExpOrEdu })(AddEducation);