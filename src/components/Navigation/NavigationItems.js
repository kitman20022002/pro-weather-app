import React from 'react';
import NavigationItem from './NavigationItem';
import './Nav.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class NavigationItems extends React.Component {
  logout = () => {
    const { onLogout } = this.props;
    onLogout();
  };

  render() {
    return (
      <ul>
        <NavigationItem link="/settings">Settings</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </ul>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(actions.logout()),
});

export default connect(null, mapDispatchToProps)(NavigationItems);
