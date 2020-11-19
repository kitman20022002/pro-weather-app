import React from 'react';
import './Settings.css';
import '../../App.css';
import {connect} from "react-redux";
import logo from '../../img/weather_small.png';
import {NavLink} from "react-router-dom";
import {updateUser} from '../../api/user';
import Modal from "../../components/Modal/Modal";
import {updateUserLocal} from "../../store/actions/auth";
import axios from 'axios';
import Account from "../../components/Account/Account";
import Payment from "../../components/Payment/Payment";

const Screen = {
    'account': <Account/>,
    'payment': <Payment/>
};

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedScreen: 'account'
        };
    }

    setScreen(screen) {
        this.setState({'selectedScreen': screen});
    }

    render() {
        return (
            <div className="flex settings">
                <div className="logo-bar">
                    <NavLink to='/dashboard'>
                        <img src={logo} className="icon--small" alt="Kitman Yiu Weather"/>
                    </NavLink>
                </div>
                <div className={"container"}>
                    <nav>
                        <h1 className="center header--settings">Settings</h1>
                        <ul>
                            <li className={this.state.selectedScreen === 'account' ? "active" : ''}
                                onClick={() => this.setScreen('account')}>Account
                            </li>
                            <li className={this.state.selectedScreen === 'connect' ? "active" : ''}
                                onClick={() => this.setScreen('account')}>Connected App
                            </li>
                            <li className={this.state.selectedScreen === 'payment' ? "active" : ''}
                                onClick={() => this.setScreen('payment')}>Billing
                            </li>
                            <li className={this.state.selectedScreen === 'email' ? "active" : ''}
                                onClick={() => this.setScreen('account')}>Email Notification
                            </li>
                        </ul>
                    </nav>
                    <div className='setting-main'>
                        {Screen[this.state.selectedScreen]}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        userId: state.auth.userId,
        token: state.auth.token,
        profileImg: state.auth.profileImg,
        profileName: state.auth.profileName
    }
};

const mapDispatchToProps = dispatch => ({
    updateUserLocal(data) {
        dispatch(
            updateUserLocal(data)
        )
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
