import React from 'react';

import { connect } from 'react-redux';
import { deleteComment } from '../../action/post';

import { Grid, Paper, Typography, Button } from '@material-ui/core'
import formatDate from '../../uliti/formatDate';
const CommentItem = ({classes, item, auth, deleteComment, commentId}) => {
  return(
    <Paper className={classes.post}>
             <Grid
               container
               justify="space-evenly"
               alignContent="space-around"
               alignItems="center">
               <Grid item md={3} xs={12} style={{ textAlign: "center" }}>
                 <img src={item.avatar} className={classes.img} alt="avatar"/>
                 <Typography color="primary" variant="h6">
                   {item.name}
                 </Typography>
               </Grid>
               <Grid item md={9} xs={12} className={classes.content}>
                 <Typography variant="body1" paragraph align="left">
                   {item.text}
                 </Typography>
                 <Typography variant="overline" gutterBottom>
                 Posted on {formatDate(item.date)}
                 </Typography>
                 {(auth.user._id === item.user) &&  <div style={{marginTop: '1em'}}>
                   <Button 
                   variant="outlined" 
                   className={classes.btn} 
                   style={{backgroundColor: 'red', color: 'white', opacity: '0.6'}}
                   onClick={() => deleteComment(commentId, item._id )}
                   >X</Button>
                 </div> }
                
               </Grid>
             </Grid>
           </Paper>
  )
}

export default connect(null ,{ deleteComment })(CommentItem);