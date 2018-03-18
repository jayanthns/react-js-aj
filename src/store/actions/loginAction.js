import * as actionTypes from './actionTypes';
import axios from 'axios'
import { LOCAL_MAIN_URL, LOGIN_URL, CREATE_ACCOUNT_URL, SERVER_MAIN_URL } from '../../constants/urls';

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  };
};

export const loginSuccess = (token, email) => {
  localStorage.setItem("token", token);
  localStorage.setItem("email", email);
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token,
    userId: email
  }
};

export const loginFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: error
  }
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  }
};

export const login = (email, password) => {
  return dispatch => {
    dispatch(loginStart());
    const authData = {
      email: email,
      password: password
    };
    console.log(LOCAL_MAIN_URL+LOGIN_URL);
    axios.post(SERVER_MAIN_URL+LOGIN_URL, authData, {})
      .then(response => {
        console.log(response.data.token, response.data.email);
        dispatch(loginSuccess(response.data.token, response.data.email))
      })
      .catch(err => {
        dispatch(loginFail("INVALID CREDENTIALS"))
      });
  }
};

export const logoutAction = (token) => {
  return dispatch => {
    dispatch(logout());
    if(token) {
      const headers = {
        'Authorization': "Token " + token
      };
      axios.post("logout url", {}, {headers: headers})

    }
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  }
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (!token) {
      dispatch(logout())
    }
    else {
      dispatch(loginSuccess(token, email))
    }
  };
};