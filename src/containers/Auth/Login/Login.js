import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

import classes from './Login.css';
import Hoc from '../../../hoc/Hoc/Hoc';
import * as actions from '../../../store/actions/index';
import ModalPopup from "../../../components/UI/ModalPopup/ModalPopup";

class Login extends Component {

  state = {
    email: '',
    password: '',
    disable: false,
    emailError: false,
    emailErrorText: 'Enter valid email id',
    passwordError: false,
    passwordErrorText: 'Enter correct password',
    submitClicked: false,
    isValidForm: false,
    showForgotPass: false,
  };

  inputHandler(event, type) {
    this.setState({[type]: event.target.value});
    this.state.submitClicked ?
      (type === 'email' ? this.checkEmail(event.target.value) : this.checkPassword(event.target.value)) :
      null;
  }

  loginClickHandler = (event) => {
    event.preventDefault();
    !this.state.submitClicked ? this.setState({submitClicked: true}) : null;
    this.checkForm() ? this.callLogin() : null;
  };

  callLogin() {
    this.props.onLogin(this.state.email, this.state.password);
  }

  checkForm() {
    let emailErr = this.checkEmail(this.state.email);
    let passError = this.checkPassword(this.state.password);
    return (!emailErr && !passError);
  }

  checkEmail(email) {
    let emailError = !Login.isEmailCorrect(email);
    this.setState({emailError: emailError});
    return emailError
  }

  static isEmailCorrect(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(String(email).toLowerCase());
  }

  checkPassword(password) {
    let passwordError = password.length < 5 || password.length > 16;
    this.setState({passwordError: passwordError});
    return passwordError
  }

  forgotPassClickHandler = () => {
    this.setState({showForgotPass: true});
  };

  closeModal = () => {
    this.setState({showForgotPass: false});
  };

  render() {
    //  Conditionally showing loader ou button
    let buttonOrLoader = this.props.loading ?
      (
        <div>
          <div className={classes.Loader}></div>
        </div>)
      :
      (
        <button
          className={[classes.BUTTON, classes.BUTTON_BLOCK].join(' ')}
          onClick={this.loginClickHandler}>Log In</button>
      );

    let emailError = this.state.emailError ? (<span className={classes.Error}>{this.state.emailErrorText}</span>) : null;
    let passwordError = this.state.passwordError ? (<span className={classes.Error}>{this.state.passwordErrorText}</span>) : null;

    let errorMessage = this.props.error ? (<p>{this.props.error}</p>) : null;

    let authRedirect = this.props.isAuthenticated ? <Redirect to="/"/> : null;

    let dom = !this.state.showForgotPass ? (
      <div className={classes.FORM}>
        {authRedirect}
        <form style={{marginLeft: '-12px'}}>
          <h1>LOGIN</h1>
          {errorMessage}
          <div className={classes.FIELD_WRAP}>
            <input
              name="email"
              type="email"
              placeholder="Email ID"
              required
              value={this.state.email}
              disabled={this.state.disable}
              onChange={(event) => this.inputHandler(event, 'email')}/>
            {emailError}
          </div>

          <div className={classes.FIELD_WRAP}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={this.state.password}
              disabled={this.state.disable}
              onChange={(event) => this.inputHandler(event, 'password')}
              maxLength="16"/>
            {passwordError}
          </div>

          <p className={classes.FORGOT}><span onClick={this.forgotPassClickHandler}>Forgot Password?</span></p>
          {buttonOrLoader}
        </form>
        <p className={classes.NEW_ACCOUNT}><NavLink className={classes.NEW_ACCOUNT} to="/register">Create New Account</NavLink></p>
      </div>
    ):
        <ModalPopup closeModal={this.closeModal} />;

    return(
      <Hoc>
        {dom}
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.login.loading,
    error: state.login.error,
    isAuthenticated: state.login.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.login(email, password))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);