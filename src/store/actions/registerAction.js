import * as actionTypes from './actionTypes';
import axios from 'axios'
import { LOCAL_MAIN_URL, SERVER_MAIN_URL, CHECK_EMAIL_URL, CREATE_ACCOUNT_URL } from '../../constants/urls';

export const checkEmail = (emailExist) => {
  return {
    type: actionTypes.CHECK_EMAIL,
    emailExist: emailExist
  };
};

export const checkEmailServer = (email) => {
  return dispatch => {
    axios.get(LOCAL_MAIN_URL+CHECK_EMAIL_URL+email+'/')
      .then(response => {
        console.log(response.data);
        dispatch(checkEmail(response.data.email_exist));
      });
  };
};

export const registerStart = () => {
  return {
    type: actionTypes.REGISTER_START
  }
};

export const registerSuccess = (token, email) => {
  localStorage.setItem("token", token);
  localStorage.setItem("email", email);
  return {
    type: actionTypes.REGISTER_SUCCESS,
    token: token,
    userId: email
  }
};

export const registerFail = (error) => {
  return {
    type: actionTypes.REGISTER_FAIL,
    error: error
  }
};

export const register = (username, email, password, repassword) => {
  return dispatch => {
    dispatch(registerStart());
    const registerData = {
      username: username,
      email: email,
      password: password,
      confirm_password: repassword
    };
    axios.post(SERVER_MAIN_URL+CREATE_ACCOUNT_URL, registerData, {})
      .then(response => {
        console.log("SUCCESS", response.data);
        dispatch(registerSuccess(response.data.token, response.data.email));
      })
      .catch(err => {
        dispatch(registerFail("Cannot create account at this time"));
      });
  }
};