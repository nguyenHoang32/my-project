import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOAD_USER, AUTH_FAIL, PROFILE_ERROR } from './Types';
import axios from 'axios';
import { setAlert } from './alert';
import { getCurrentProfile } from './profile'
import setAuthToken from '../uliti/setAuthToken';

// ----------------------------------------------------------
export const loadUser = () => async dispatch => {
  if(localStorage.token){
    setAuthToken(localStorage.token)
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: LOAD_USER,
      payload : res.data
    })
    dispatch(getCurrentProfile());
  } catch (error) {
    dispatch({
      type: AUTH_FAIL
    })
  }
}
//  --------------------------------------------------------
export const register = ({email, password, name}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({name, email, password});
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser());
    
  } catch (error) {
   
    
    dispatch({
      type: REGISTER_FAIL,
    })
  }
}

// -----------------------------------------
export const login = ({email, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({email, password})
  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
    setAuthToken(res.data.token);
    dispatch(loadUser());
    
  } catch (error) {
    
    
    dispatch({
      type: LOGIN_FAIL,
    })
  }
}
// ------------------------------------------
export const logout = () => (dispatch) => {
  dispatch({
    type: PROFILE_ERROR
  })
  dispatch({
    type: LOGOUT
  })
 
}