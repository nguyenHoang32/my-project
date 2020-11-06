import React from "react";

import { Typography } from "@material-ui/core";
import formatDate from '../../uliti/formatDate'
const EducationItem = ({ classes, education }) => {
  const { school, degree, fieldofstudy, from, to, current, description } = education
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {school}
      </Typography>
      <Typography gutterBottom>{`${formatDate(from)} - ${Boolean(current) ? 'Current' : formatDate(to)}`}</Typography>
      <div>
        <Typography variant="button" display="inline" gutterBottom>
          Degree :
        </Typography>
        <Typography display="inline" gutterBottom>
          {degree}
        </Typography>
      </div>
      <div>
        <Typography variant="button" display="inline" gutterBottom>
          Field Of Study :
        </Typography>
        <Typography display="inline" gutterBottom>
          {fieldofstudy}
        </Typography>
      </div>
      <div>
        <Typography variant="button" display="inline" gutterBottom>
          Description :
        </Typography>
        <Typography display="inline">
          {description}
        </Typography>
      </div>
    </React.Fragment>
  );
};
export default EducationItem;
