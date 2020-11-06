import { SET_ALERT, REMOVE_ALERT } from './Types';
import { v4 as uuidv4 } from 'uuid';
export const setAlert = (msg, type, time = 6000) => async dispatch => {
  // payload = {msg, type}
  const id = uuidv4();
  await dispatch({
    type: SET_ALERT,
    payload: {msg, type, id}
  })

  setTimeout(() => dispatch({
    type: REMOVE_ALERT,
    payload: id
  }) , time)
}
export const removeAlert = (id) => dispatch => {
  dispatch({
    type: REMOVE_ALERT,
    payload: id
  })
}