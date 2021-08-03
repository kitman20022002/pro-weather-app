import React from 'react';
import './Settings.css';
import '../../App.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../../img/weather_small.png';
import { updateUserLocal } from '../../store/actions';
import Account from '../../components/Account/Account';
import Payment from '../../components/Payment/Payment';

const Screen = {
  account: <Account />,
  payment: <Payment />,
};

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedScreen: 'account',
    };
  }

  setScreen(screen) {
    this.setState({ selectedScreen: screen });
  }

  render() {
    const { selectedScreen } = this.state;
    return (
      <div className="flex settings">
        <div className="logo-bar">
          <NavLink to="/dashboard">
            <img src={logo} className="icon--small" alt="Kitman Yiu Weather" />
          </NavLink>
        </div>
        <div className="container">
          <nav>
            <h1 className="center header--settings">Settings</h1>
            <ul>
              <li
                className={selectedScreen === 'account' ? 'active' : ''}
                onClick={() => this.setScreen('account')}
              >
                Account
              </li>
              <li
                className={selectedScreen === 'connect' ? 'active' : ''}
                onClick={() => this.setScreen('account')}
              >
                Connected App
              </li>
              <li
                className={selectedScreen === 'payment' ? 'active' : ''}
                onClick={() => this.setScreen('payment')}
              >
                Billing
              </li>
              <li
                className={selectedScreen === 'email' ? 'active' : ''}
                onClick={() => this.setScreen('account')}
              >
                Email Notification
              </li>
            </ul>
          </nav>
          <div className="setting-main">{Screen[selectedScreen]}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  isAuth: state.auth.token !== null,
  userId: state.auth.userId,
  token: state.auth.token,
  profileImg: state.auth.profileImg,
  profileName: state.auth.profileName,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserLocal(data) {
    dispatch(updateUserLocal(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
