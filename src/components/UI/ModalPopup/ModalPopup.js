/**
 * Created by aveto on 4/3/18.
 */
import React from 'react';
// import { Modal, Button } from 'react-bootstrap'

import Hoc from '../../../hoc/Hoc/Hoc';
import classes from './ModalPopup.css';

export default (props) => (
  //  The Modal
  <Hoc>
    <div id="myModal" className={classes.modal}>

      {/*Modal content*/}
      <div className={classes.modal_content}>
        <div className={classes.modal_header}>
          <span onClick={props.closeModal} className={classes.close}>&times;</span>
          <h2>Reset Your Password</h2>
        </div>
        <div className={classes.modal_body}>
          <div className={classes.FORM}>
            <form style={{marginLeft: '-12px'}}>
              <div className={classes.FIELD_WRAP}>
                <input
                  name="email"
                  type="email"
                  placeholder="Email ID"
                  required
                />
              </div>
              <div className={classes.ButtonGroup}>
                  <button
                    className={[classes.BUTTON, classes.BUTTON_BLOCK].join(' ')}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  </Hoc>
)