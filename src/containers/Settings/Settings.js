import React from 'react';
import './Settings.css';
import '../../App.css';

import logo from '../../img/weather_small.png';
import {NavLink} from "react-router-dom";

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: 'coconut',
            comments: 'sdf',
            email: 'dsfd',
            password: 'dsf',
            value: 'grapefruit'
        };
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        return (
            <div className="flex">
                <div className="logo-bar">
                    <NavLink to='/'>
                        <img src={logo} className="icon--small" alt="Kitman Yiu Weather"/>
                    </NavLink>
                </div>
                <nav>
                    <h1 className="center header--settings">Settings</h1>
                    <ul>
                        <li>Personal Settings</li>
                        <li>Account</li>
                        <li>Connected App</li>
                        <li>Billing</li>
                        <li>Email Notification</li>
                    </ul>
                </nav>
                <div className='setting-main'>
                    <div className="container--main">
                        <form className="setting__form" onSubmit={this.props.submitForm}>
                            <label>
                                Name:
                            </label>
                            <input type="text" name='firstName' value={this.state.firstName}
                                   onChange={this.handleChange}/>
                            {/*<label>*/}
                            {/*Email:*/}
                            {/*</label>*/}
                            {/*<input type="text" name='email' value={this.state.email} onChange={this.handleChange}/>*/}
                            <label>
                                Username:
                            </label>
                            <input type="password" name='password' value={this.state.password}
                                   onChange={this.handleChange}/>
                            <label>
                                Select Default Country:
                            </label>
                            <select name='value' value={this.state.value} onChange={this.handleChange}>
                                <option value="grapefruit">Grapefruit</option>
                                <option value="lime">Lime</option>
                                <option value="coconut">Coconut</option>
                                <option value="mango">Mango</option>
                            </select>

                            <input type="submit" value="Save Value"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings
