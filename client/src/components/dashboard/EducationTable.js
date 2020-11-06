import React from "react";

import { connect } from 'react-redux';
import { deleteExpOrEdu } from '../../action/profile'

import { Grid, Typography, Hidden, Paper, TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody, } from '@material-ui/core';
const EducationTable = ({classes, education, deleteExpOrEdu}) => {
  const formatDate = (date) => {
    const newDate = new Date(date).toLocaleDateString("en-US");
    return newDate;
  }
  const listEducation = education.map((edu, index) => 
  (
    <TableRow key={index}>
    <TableCell component="th" scope="row">
      {edu.school}
    </TableCell>
  <TableCell>{edu.degree}</TableCell>
    <Hidden mdDown>
      <TableCell>
      {`${formatDate(edu.from)} - ${Boolean(edu.current) ? 'Current' : formatDate(edu.to)}`}
      </TableCell>
    </Hidden>
    <TableCell align="center">
      <button className={classes.btn} onClick={() => deleteExpOrEdu(edu._id, 'education')}>Delete</button>
    </TableCell>
    </TableRow>
  ))
  return (
    <React.Fragment>
          <div style={{paddingTop: '2rem'}}></div>
          <Grid item  >
            <Typography variant="h5" className={classes.credentials}>
              Education Credentials
            </Typography>
          </Grid>
          <Grid item>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow className={classes.head}>
                    <TableCell>School</TableCell>
                    <TableCell>Degree</TableCell>
                    <Hidden mdDown>
                      <TableCell>Years</TableCell>
                    </Hidden>
                    <TableCell style={{ borderRight: "none" }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                 {listEducation}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </React.Fragment>
  )
};
export default connect(null , { deleteExpOrEdu })(EducationTable);
