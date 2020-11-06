import {
  UPDATE_PROFILE,
  PROFILE_ERROR,
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from "./Types";
import { setAlert } from "./alert";

import axios from "axios";

// ---------------------------------------------------
export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (error) {}
};
// -------------------------------------------
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    const { response } = error;
    dispatch({
      type: PROFILE_ERROR,
    });
    dispatch(setAlert(`${response.status} : ${response.statusText}`, "error"));
  }
};
// ---------------------------------------------
export const getProfileById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.statusText, "error"));
  }
};

// ------------------------------------------------------
export const updateProfile = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);
  
  try {
    const res = await axios.post("/api/profile", body, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Add Profile Success", "success"));

    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors.length > 0) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

// ---------------------------------------------------
export const addExpOrEdu = (formData, history, type) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);
  try {
    const res = await axios.put(`/api/profile/${type}`, body, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(`Add ${type} Success`, "success"));
    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors.length > 0) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "error")));
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};
// ----------------------------------------------------
export const deleteExpOrEdu = (id, type) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/${type}/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(`Deleted ${type}`, "success"));
  } catch (error) {}
};

// -------------------------------------------
export const getRepos = (name) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${name}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, "error"));
  }
};
// ---------------------------------------------
