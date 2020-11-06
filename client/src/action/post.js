import { GET_ALL_POSTS, GET_POST, CREATE_POST, DELETE_POST, UPDATE_LIKE, ADD_COMMENT, DELETE_COMMENT } from './Types';
import { setAlert } from './alert';
import axios from 'axios';

export const getAllPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_ALL_POSTS,
      payload: res.data
    })
  } catch (error) {
    
  }
}
// -----------------------------------------------
export const getPost = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`)
    dispatch({
      type: GET_POST,
      payload: res.data
    })
  } catch (error) {
    if(error.response) dispatch(setAlert(error.response.data.msg, 'error'));
  }
}
// -----------------------------------------------------
export const createPost = (text) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const obj = {
    text
  }
  const body = JSON.stringify(obj);
  try {
    const res = await axios.post('/api/posts', body, config );
    dispatch({
      type: CREATE_POST,
      payload: res.data 
      // return new post
    })  
    dispatch(setAlert('Add post successful', 'success'))
  } catch (error) {
    const errors = error.response.data.errors;
    if(errors.length > 0){
      errors.forEach(err => dispatch(setAlert(err.msg, 'error')))
    }
  }
}

// --------------------------------------------
export const deletePost = (id) => async dispatch => {
  
  try {
    const res = await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id
    }
    )
    dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.statusText, 'error'))
  }
}
// ----------------------------------------------------
export const updateLike = (id, type) => async dispatch => {
  
  try {
    const res = await axios.put(`/api/posts/${type}/${id}`);
    const payload = {
      id,
      likes: res.data
    }
    
    dispatch({
      type: UPDATE_LIKE,
      payload
    })
    
  } catch (error) {
    if(error.response) dispatch(setAlert(error.response.data.msg, 'error'));
    
  }
}
// -----------------------------------------------
export const addComment = (id, text) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = { text };
  try {
    const res = await axios.post(`/api/posts/comments/${id}`, body, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    })
  } 
  catch (error) {
    if(error.response){
      const errors = error.response.data.errors;
      if(errors.length > 0){
        errors.forEach(err => dispatch(setAlert(err.msg, 'error')))
      }
    }
    
  }
}
// ---------------------------------------------------------------
export const deleteComment = (id, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comments/${id}/${commentId}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: commentId
    })
  } catch (err) {
    dispatch(setAlert(err.response.statusText, 'error'));
  }
}