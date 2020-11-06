import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER,
  AUTH_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
} from "../action/Types";

const initialState = {
  token: localStorage.getItem("token"),
  isLoading: true,
  user: null,
  isAuth: false,
};

const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USER: {
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        user: payload,
      };
    }
    case REGISTER_SUCCESS:
      return {
        ...state,
        token: payload.token,
        isLoading: false,
        isAuth: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload.token,
        isLoading: false,
        isAuth: true,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_FAIL: {
      return {
        ...state,
        token: null,
        isLoading: false,
        isAuth: false,
        user: null,
      };
    }
    case LOGOUT: {
      localStorage.removeItem('token')
      return{
        ...state,
        token: null,
        isLoading: false,
        isAuth: false,
        user: null
      }
    }
    default:
      return state;
  }
};
export default auth;
