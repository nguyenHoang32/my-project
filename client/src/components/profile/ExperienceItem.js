import React from "react";

import { Typography } from "@material-ui/core";

import formatDate from '../../uliti/formatDate';
const ExperienceItem = ({ classes, experience }) => {
  const { company, title, location, current, from, to, description } = experience;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {company}
      </Typography>
      <Typography gutterBottom>{`${formatDate(from)} - ${Boolean(current) ? 'Current' : formatDate(to)}`}</Typography>
      <div>
        <Typography variant="button" display="inline">
          Position :
        </Typography>
        <Typography display="inline" gutterBottom>
          {title}
        </Typography>
      </div>
      <div>
        <Typography variant="button" display="inline">
          Location :
        </Typography>
        <Typography display="inline" gutterBottom>
          {location}
        </Typography>
      </div>
      <div>
        <Typography variant="button" display="inline" gutterBottom>
          Description :
        </Typography>
        <Typography display="inline" gutterBottom>
          {description}
        </Typography>
      </div>
    </React.Fragment>
  );
};
export default ExperienceItem;
