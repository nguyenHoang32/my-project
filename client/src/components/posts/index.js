import React, { useEffect } from 'react';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { connect } from 'react-redux';
import { getAllPosts } from '../../action/post'; 

import { makeStyles, useTheme } from '@material-ui/core';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
}));
function Posts({getAllPosts, post: { posts }}) {
  const classes = useStyles();
  const theme = useTheme();
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
  
  const listPost = posts.map((post, index) => <PostItem post={post} key={index}/>)
  return (
    <React.Fragment>
      <Typography variant="h3" color="primary" paragraph>
        Posts
      </Typography>
      <Typography variant="h5" paragraph>
        <i className="fa fa-user"></i>
        Welcome to the community!
      </Typography>
      <Typography
        gutterBottom
        paragraph
        variant="h6"
        style={{
          color: "white",
          backgroundColor: theme.palette.common.primary,
          padding: "0.5em",
        }}>
        Say Something...
      </Typography>
      <PostForm classes={classes}/>
      {listPost}
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  post: state.post
})
export default connect(mapStateToProps, { getAllPosts })(Posts);