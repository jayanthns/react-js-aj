import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';

import Hoc from '../Hoc/Hoc';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import * as actions from '../../store/actions/loginAction';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  componentDidMount() {
    this.props.checkAuth();
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    });
  };

  render() {
    return (
      <Hoc>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.login.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: () => dispatch(actions.authCheckState())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);