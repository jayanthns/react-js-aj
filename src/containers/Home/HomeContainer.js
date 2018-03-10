/**
 * Created by aveto on 4/3/18.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ModalPopup from '../../components/UI/ModalPopup/ModalPopup';

class HomeContainer extends Component {

  render() {
    return !this.props.token ?
      (<Redirect to="/login"/>) :
      (
        <ModalPopup />
      );
  }
}

const mapStateToProps = state => {
  return {
    token: state.login.token
  }
};

export default connect(mapStateToProps)(HomeContainer);

