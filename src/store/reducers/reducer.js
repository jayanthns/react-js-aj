import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loggingIn: false,
  loggedIn: false,
  loggingOut: false,
  loggedOut: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    default: return state;
  }
};

export default reducer;