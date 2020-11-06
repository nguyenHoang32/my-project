import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import profile from './profile';
import post from './post';
const myReducers = combineReducers({
  auth,
  alert,
  profile,
  post
});
export default myReducers;