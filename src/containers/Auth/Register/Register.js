import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import classes from './Register.css';
import Hoc from '../../../hoc/Hoc/Hoc';
import * as actions from '../../../store/actions/index';

const usernameRegex = /^[a-zA-Z0-9]+$/;

const USERNAME_ERROR_TEXT = 'Please enter valid username. (Minimum length is 3)';
const EMAIL_ERROR_TEXT = 'Please enter valid email.';
const PASSWORD_ERROR_TEXT = 'Please enter correct password. (Length between 5 - 16)';
const REPASSWORD_ERROR_TEXT = 'Please enter same password as previous.';
const EMAIL_EXISTS_TEXT = 'Email is already registered.';

class Register extends Component {

  state = {
    userName: '',
    email: '',
    password: '',
    repassword: '',
    loading: false,
    userNameError: false,
    emailError: false,
    passwordError: false,
    repasswordError: false,
    isValidForm: false,
    submitClickedOnce: false,
    emptyForm: true,
  };

  checkUserName = (userName) => {
    return usernameRegex.test(userName) && userName.length > 2;
  };

  checkEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const res = re.test(String(email).toLowerCase());
    return res;
  };

  checkPassword = (password) => {
    return password.length >= 5 && password.length <= 16;
  };

  checkRePassword = (repassword, password) => {
    return repassword === password && repassword.length > 0;
  };

  inputHandler(event, type) {
    const value = event.target.value;
    this.setState({[type]: value});
    switch (type) {
      case 'userName':
        this.setState({userNameError: !this.checkUserName(value)});
        break;
      case 'email':
        const res = this.checkEmail(value);
        this.setState({emailError: !res});
        if (res) {
          this.props.onCheckEmail(value);
        }
        break;
      case 'password':
        this.setState({passwordError: !this.checkPassword(value)});
        break;
      case 'repassword':
        this.setState({repasswordError: !this.checkRePassword(value, this.state.password)});
        break;
      default:
        break;
    }
    const {userNameError, emailError, passwordError, repasswordError} = this.state;
    this.setState({emptyForm: false, isValidForm: !(userNameError || emailError || passwordError || repasswordError)})
  }

  signupClickHandler = (event) => {
    event.preventDefault();
    const result = this.checkForm(this.state);
    if(result && !this.props.emailExist) {
      this.setState({loading: true});
    //  call register action here
      const {userName, email, password, repassword} = this.state;
      this.props.onRegister(userName, email, password, repassword);
      console.log("CALLING REGISTER METHOD");
    }
  };

  checkForm({userName, email, password, repassword}) {
    this.setState({userNameError: !this.checkUserName(userName)});
    this.setState({emailError: !this.checkEmail(email)});
    this.setState({passwordError: !this.checkPassword(password)});
    this.setState({repasswordError: !this.checkRePassword(repassword, password)});
    const {userNameError, emailError, passwordError, repasswordError} = this.state;
    const result = !(userNameError || emailError || passwordError || repasswordError)
      && !userName.length < 1 && !email.length < 1 && !password.length < 1 && !repassword.length < 1;
    this.setState({isValidForm: result});
    return result;
  }

  render() {
    let usernameError = this.state.userNameError ? (<span className={classes.Error}>{USERNAME_ERROR_TEXT}</span>) : null;
    let emailError = this.state.emailError ? (<span className={classes.Error}>{EMAIL_ERROR_TEXT}</span>) : null;
    let passwordError = this.state.passwordError ? (<span className={classes.Error}>{PASSWORD_ERROR_TEXT}</span>) : null;
    let repasswordError = this.state.repasswordError ? (<span className={classes.Error}>{REPASSWORD_ERROR_TEXT}</span>) : null;
    let emailExistsMessage = this.props.emailExist ? (<span className={classes.Error}>{EMAIL_EXISTS_TEXT}</span>) : null;
    let authRedirect = this.props.isAuthenticated ? <Redirect to="/"/> : null;
    let buttonOrLoader = this.props.loading ?
      (
        <div>
          <div className={classes.Loader}></div>
        </div>)
      :
      (
        <button
          className={[classes.BUTTON, classes.BUTTON_BLOCK].join(' ')}
          onClick={this.signupClickHandler}>Sign Up</button>
      );

    return(
      <Hoc>
        <div className={classes.FORM}>
          {authRedirect}
          <form style={{marginLeft: '-12px'}}>
            <h1>SIGN UP</h1>

            <div className={classes.FIELD_WRAP}>
              <input
                type="text"
                placeholder="Username *"
                required
                onChange={(event) => this.inputHandler(event, 'userName')}
              />
              {usernameError}
            </div>

            <div className={classes.FIELD_WRAP}>
              <input
                type="email"
                placeholder="Email ID *"
                required
                onChange={(event) => this.inputHandler(event, 'email')}
              />
              {emailError}
              {emailExistsMessage}
            </div>

            <div className={classes.FIELD_WRAP}>
              <input
                type="password"
                placeholder="Password *"
                required
                maxLength={16}
                onChange={(event) => this.inputHandler(event, 'password')}
              />
              {passwordError}
            </div>

            <div className={classes.FIELD_WRAP}>
              <input
                type="password"
                placeholder="Repeat Password *"
                maxLength={16}
                required
                onChange={(event) => this.inputHandler(event, 'repassword')}
              />
              {repasswordError}
            </div>

            {buttonOrLoader}

            <p className={classes.LOGIN_LINK}><NavLink className={classes.LOGIN_LINK} to="/login">Click Here For Login</NavLink></p>

          </form>
        </div>
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    emailExist: state.register.emailExist,
    loading: state.register.loading,
    isAuthenticated: state.login.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckEmail: (email) => dispatch(actions.checkEmailServer(email)),
    onRegister: (username, email, password, repassword) => dispatch(actions.register(username, email, password, repassword))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);