import React, { useEffect } from "react";
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { getPost } from '../../action/post';

import { useTheme, makeStyles } from "@material-ui/core";
import { Grid, Button, Typography, Paper } from "@material-ui/core";

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
}))
const Post = ({getPost, match, post: { isLoading, post }, auth }) => {
  const classes = useStyles();
  const theme = useTheme();
  useEffect(() => {
    getPost(match.params.id);
  }, [match.params, getPost])
 
  if(isLoading) return <h1>Loading...</h1>
  const { name, avatar, text, date } = post;
  return (
    <Grid container direction="column">
      <Grid item>
        <Button variant="text" component={Link} to="/posts">Back to posts</Button>
      </Grid>
      <Paper className={classes.post}>
        <Grid
          container
          justify="space-evenly"
          alignContent="space-around"
          alignItems="center">
          <Grid item md={3} xs={12} style={{ textAlign: "center" }}>
            <img src={avatar} className={classes.img} alt="avatar"/>
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
          </Grid>
        </Grid>
      </Paper>
      <Grid item>
        <Typography
          gutterBottom
          paragraph
          variant="h6"
          style={{
            color: "white",
            backgroundColor: theme.palette.common.primary,
            padding: "0.5em",
          }}
        >
          Leave a comment
        </Typography>
        <CommentForm match={match}/>
      </Grid>
      <Grid item>
        
        {(post.comments && !isLoading) && post.comments.map((item, index) => (
             <CommentItem 
             key={index} 
             classes={classes} 
             item={item} 
             auth={auth}
             commentId={match.params.id}
             />
          )) }
       
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
})
export default connect(mapStateToProps, {getPost})(Post);
