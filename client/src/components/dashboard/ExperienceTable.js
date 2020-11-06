import React from "react";

import { connect } from 'react-redux';
import { deleteExpOrEdu } from '../../action/profile'

import {
  Grid,
  Typography,
  Hidden,
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@material-ui/core";
const ExperienceTable = ({ classes, experience, deleteExpOrEdu }) => {
  const formatDate = (date) => {
    const newDate = new Date(date).toLocaleDateString("en-US");
    return newDate;
  }
  const experienceList = experience.map((exp, index) => (
    <TableRow key={index}>
      <TableCell component="th" scope="row">
        {exp.company}
      </TableCell>
      <TableCell>{exp.title}</TableCell>
      <Hidden mdDown>
        <TableCell>
          {`${formatDate(exp.from)} - ${Boolean(exp.current) ? 'Current' : formatDate(exp.to)}`}
        </TableCell>
      </Hidden>
      <TableCell align="center">
        <button className={classes.btn} onClick={() => deleteExpOrEdu(exp._id, 'experience')}>Delete</button>
      </TableCell>
    </TableRow>
  ));
  return (
    <React.Fragment>
      <div style={{marginTop: '2rem'}}></div>
      <Grid item>
        <Typography variant="h5" className={classes.credentials}>
          Experience Credentials
        </Typography>
      </Grid>
      <Grid item>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.head}>
                <TableCell>Company</TableCell>
                <TableCell>Title</TableCell>
                <Hidden mdDown>
                  <TableCell>Years</TableCell>
                </Hidden>
                <TableCell style={{ borderRight: "none" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{experienceList}</TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </React.Fragment>
  );
};
export default connect(null, { deleteExpOrEdu })(ExperienceTable);
