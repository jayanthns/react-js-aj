import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  emailExist: false,
  token: null,
  userId: null,
  error: null,
  loading: false
};

const checkEmail = (state, action) => {
  return updateObject(state, {emailExist: action.emailExist});
};

const registerStart = (state, action) => {
  return updateObject(state, {error: null, loading: true});
};

const registerSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false
  });
};

const registerFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.CHECK_EMAIL: return checkEmail(state, action);
    case actionTypes.REGISTER_START: return registerStart(state, action);
    case actionTypes.REGISTER_SUCCESS: return registerSuccess(state, action);
    case actionTypes.REGISTER_FAIL: return registerFail(state, action);
    default: return state;
  }
};

export default reducer;