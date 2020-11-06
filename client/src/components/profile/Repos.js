import React, { useEffect } from "react";

import { connect } from "react-redux";
import { getRepos } from "../../action/profile";

import { makeStyles } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";

import formatDate from '../../uliti/formatDate'
const useStyles = makeStyles((theme) => ({
  container: {
    border: `1px solid ${theme.palette.common.border}`,
    padding: "1.5em",
    marginBottom: "2em",
  },
  info: {
    padding: '0.1em',
    margin: '0.3em',
    textAlign: 'center',
  },
  size:{
    backgroundColor: theme.palette.common.primary,
    color: 'white',
    
  },
  watchers: {
    backgroundColor: theme.palette.common.dark,
    color: 'white',
    
  },
  forks: {
    border: `1px solid ${theme.palette.common.border}`,
    
  }
}));
const Repos = ({ repos, githubusername, getRepos }) => {
  const classes = useStyles();
  useEffect(() => {
    getRepos(githubusername);
  }, [getRepos]);

  return (
    <>
      {repos.map((repo, index) => (
        <div key={index} className={classes.container}>
          <Grid container justify="space-between">
          <Grid item md={9}>
            <Typography color="primary" component="a" href={repo.html_url} target="_blank" style={{textDecoration: 'none'}}>{repo.name}</Typography>
            <Typography>{`Create at ${formatDate(repo.created_at)}`}</Typography>
            <Typography>{repo.description}</Typography>
          </Grid>
          <Grid item md={3}>
            <ul>
              <li className={`${classes.info} ${classes.size}`}>Size: {repo.size} </li>
              <li className={`${classes.info} ${classes.watchers}`}>Watcher: {repo.watchers}</li>
              <li className={`${classes.info} ${classes.forks}`}>Forks: {repo.forks}</li>
            </ul>
          </Grid>
          </Grid>

        </div>
      ))}
    </>
  );
};
const mapState = (state) => ({
  repos: state.profile.repos,
  githubusername: state.profile.profile.githubusername,
});
export default connect(mapState, { getRepos })(Repos);
