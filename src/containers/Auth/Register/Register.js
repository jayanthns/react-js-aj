import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import classes from './Register.css';
import Hoc from '../../../hoc/Hoc/Hoc';

class Register extends Component {

  signupClickHandler = (event) => {
    event.preventDefault();
  };

  render() {
    return(
      <Hoc>
        <div className={classes.FORM}>
          <form style={{marginLeft: '-12px'}}>
            <h1>SIGN UP</h1>

            <div className={classes.FIELD_WRAP}>
              {/*<label>*/}
              {/*Email Address<span className={classes.REQ}>*</span>*/}
              {/*</label>*/}
              <input type="text" placeholder="Username" required/>
            </div>

            <div className={classes.FIELD_WRAP}>
              {/*<label>*/}
              {/*Email Address<span className={classes.REQ}>*</span>*/}
              {/*</label>*/}
              <input type="email" placeholder="Email ID" required/>
            </div>

            <div className={classes.FIELD_WRAP}>
              {/*<label>*/}
              {/*Password<span className={classes.REQ}>*</span>*/}
              {/*</label>*/}
              <input type="password" placeholder="Password" required/>
            </div>

            <div className={classes.FIELD_WRAP}>
              {/*<label>*/}
              {/*Password<span className={classes.REQ}>*</span>*/}
              {/*</label>*/}
              <input type="password" placeholder="Repeat Password" required/>
            </div>

            <button
              className={[classes.BUTTON, classes.BUTTON_BLOCK].join(' ')}
              onClick={this.signupClickHandler}>Sign Up</button>

            <p className={classes.LOGIN_LINK}><NavLink className={classes.LOGIN_LINK} to="/login">Click Here For Login</NavLink></p>

          </form>
        </div>
      </Hoc>
    );
  }
}

export default Register;