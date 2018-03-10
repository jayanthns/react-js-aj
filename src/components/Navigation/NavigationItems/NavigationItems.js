import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    {!props.isAuthenticated ? <NavigationItem link="/login" exact>Login</NavigationItem> : null}
    {
      !props.isAuthenticated ?
        <NavigationItem link="/register" exact>Register</NavigationItem> :
        <NavigationItem link="/logout" exact>Logout</NavigationItem>
    }
  </ul>
);

export default navigationItems;