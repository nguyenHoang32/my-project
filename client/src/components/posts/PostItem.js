import React from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import { updateLike, deletePost } from '../../action/post'

import { makeStyles } from '@material-ui/core';
import { Paper, Grid, Typography, Button } from '@material-ui/core';
import formatDate from '../../uliti/formatDate';
const useStyles = makeStyles((theme) => ({
  post: {
    border: `1px solid ${theme.palette.common.border}`,
    paddingTop: "1em",
    paddingBottom: "1em",
    marginBottom: '1em'
  },
  img: {
    borderRadius: "50%",
    height: "7em",
    margin: "auto",
  },
  content: {
    [theme.breakpoints.down("md")]: {
      padding: "1.5em",
    },
  },
  btn: {
    height: '2.3em',
    marginRight: '1em',
    [theme.breakpoints.down('md')]: {
      marginRight: '0.2em'
    }
  }
}))
const PostItem = ({post, updateLike, auth, deletePost}) => {
  const { name, text, date, avatar, _id, likes, user } = post;
  const classes = useStyles();
  return(
    <Paper className={classes.post}>
        <Grid
          container
          justify="space-evenly"
          alignContent="space-around"
          alignItems="center">
          <Grid item md={3} xs={12} style={{ textAlign: "center" }}>
            <img src={avatar} className={classes.img} alt="avatar" />
            <Typography color="primary" variant="h6">
              {name}
            </Typography>
          </Grid>
          <Grid item md={9} xs={12} className={classes.content}>
            <Typography variant="body1" paragraph align="left">
              {text}
            </Typography>
            <Typography variant="overline" gutterBottom>
            Posted on {formatDate(date)}
            </Typography>
            <div style={{marginTop: '1em'}}>
              <Button 
              variant="outlined" 
              
              className={classes.btn}
              onClick={() => updateLike(_id, 'like')}>
                <i className="fa fa-thumbs-up"></i>
  <span>{likes.length > 0 && likes.length}</span>
              </Button>
              <Button 
              variant="outlined" 
              
              className={classes.btn}
              onClick={() => updateLike(_id, 'unlike')}>
                <i className="fa fa-thumbs-down"></i>
              </Button>
              <Button 
              color="primary" 
              variant="contained" 
              className={classes.btn}
              component={Link}
              to={`/posts/${_id}`}
              >Discussion</Button>
              { (auth.user._id === user) && 
              <Button 
              variant="outlined" 
              className={classes.btn} 
              style={{backgroundColor: 'red', color: 'white', opacity: '0.6'}}
              onClick={() => deletePost(_id)}>X</Button>}
            </div>
          </Grid>
        </Grid>
      </Paper>
  )
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps , {updateLike, deletePost})(PostItem);