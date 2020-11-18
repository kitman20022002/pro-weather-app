import React from 'react';
import './Settings.css';
import '../../App.css';
import {connect} from "react-redux";
import logo from '../../img/weather_small.png';
import {NavLink} from "react-router-dom";
import {updateUser} from '../../api/user';
import Modal from "../../components/Modal/Modal";

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: 'coconut',
            lastName: 'dd',
            password: '1234567',
            city: 'Sydney',
            profile_img: 'https://pbs.twimg.com/profile_images/3128016790/d41f7c7ca1662ea737cc7073e0901706_normal.png',
            modalShow: false
        };
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    updateUser = async (e) => {
        e.preventDefault();
        let data = {
            'name': {'firstName': this.state.firstName, 'lastName': this.state.lastName},
            'city': this.state.city,
            'password': this.state.password,
            'profile_img': this.state.profile_img,
            'token': this.props.token
        };
        this.setState({'modalShow': true});
        let result = await updateUser(this.props.userId, data, this.props.token);
    };


    closeModal = () => {
        this.setState({'modalShow': false});
    };

    render() {
        return (
            <div className="flex">
                <div className="logo-bar">
                    <NavLink to='/dashboard'>
                        <img src={logo} className="icon--small" alt="Kitman Yiu Weather"/>
                    </NavLink>
                </div>
                <nav>
                    <h1 className="center header--settings">Settings</h1>
                    <ul>
                        <li>Personal Settings and Account</li>
                        <li>Connected App</li>
                        <li>Billing</li>
                        <li>Email Notification</li>
                    </ul>
                </nav>
                <div className='setting-main'>
                    <div className="container--main">
                        <form className="setting__form" onSubmit={this.props.submitForm}>
                            <h2>Account</h2>
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
                            <input type="text" name='username' value={this.state.lastName}
                                   onChange={this.handleChange}/>
                            <label>
                                Password:
                            </label>
                            <input type="password" name='password' value={this.state.password}
                                   onChange={this.handleChange}/>
                            <h2>Settings</h2>
                            <label>
                                Default City:
                            </label>
                            <select name='value' value={this.state.value} onChange={this.handleChange}>
                                <option value="grapefruit">Grapefruit</option>
                                <option value="lime">Lime</option>
                                <option value="coconut">Coconut</option>
                                <option value="mango">Mango</option>
                            </select>
                            <input type="submit" value="Save Value" onClick={this.updateUser}/>
                        </form>
                        <Modal show={this.state.modalShow}>
                            <h2>Updated</h2>
                            <button onClick={this.closeModal}>OK</button>
                        </Modal>
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
    }
};

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
