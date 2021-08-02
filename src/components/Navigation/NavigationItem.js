import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => (
  <li className={`${props.active ? 'active' : null} navigation__item`}>
    <NavLink to={props.link} exact={props.exact} activeClassName="active">
      {props.children}
    </NavLink>
  </li>
);

export default NavigationItem;
