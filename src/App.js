import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Register from './containers/Auth/Register/Register';
import Login from './containers/Auth/Login/Login';
import Logout from "./containers/Auth/Logout/Logout";
import HomeContainer from "./containers/Home/HomeContainer";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Switch>
              <Route path="/register" component={Register}/>
              <Route path="/login" component={Login}/>
              <Route path="/logout" component={Logout}/>
              <Route path="/" component={HomeContainer}/>
            </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
