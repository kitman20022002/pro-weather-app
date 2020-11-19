import React from 'react';
import {Link} from 'react-router-dom';
import './Login.css';
import {connect} from "react-redux";
import * as action from "../../store/actions";
import Loader from "../../components/Loader/Loader";
import Backdrop from "../../components/Backdrop/Backdrop";
import Modal from '../../components/Modal/Modal';
import axios from 'axios';
import DynamicWeather from "../../components/DynamicWeather/DynamicWeather";
import {getWeather} from "../../api/weatherapi";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {
                elementConfig: {
                    placeholder: 'kitmanwork@gmail.com'
                },
                validation: {
                    required: true,
                    isEmail: true
                },
                errorMessage: {
                    email: "Not valid Email",
                    required: 'Email is required',
                },
                valid: false,
                value: '',
                cssClass: '',
            },
            password: {
                elementConfig: {
                    placeholder: 'kitmanwork@gmail.com'
                },
                validation: {
                    required: true,
                },
                errorMessage: {
                    required: 'Password is required',
                },
                valid: false,
                value: '',
                cssClass: '',
            },
            checkForget: false,
            checked: true,
            images: "",
            data: {}
        };
        this.loadDefaultData();
        this.modalClose = this.closeModal.bind(this);
    }

    async loadDefaultData() {
        let result = await getWeather("sydney");
        result.data.daily.data = result.data.daily.data.splice(0, 5);
        this.setState({data: result.data, isLoaded: true, error: false});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.email.value, this.state.password.value);
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    onChange = (e) => {
        const updatedFormElement = {
            ...this.state[e.target.name]
        };

        let isValid = this.checkValidity(e.target.value, updatedFormElement.validation);
        if (!isValid) {
            updatedFormElement.cssClass = 'color--red';
        } else {
            updatedFormElement.cssClass = '';
        }
        updatedFormElement.value = e.target.value;
        this.setState({[e.target.name]: updatedFormElement});
    };

    getErrorMessage = (message) => {
        switch (message) {
            case 400:
                return "Incorrect Username or password";
            case 401:
                return "Incorrect Username or password";
            default:
                return "Server Error";
        }
    };

    closeModal = () => {
        this.props.closeModal();
    };

    handleSubmitForgetMessage = async () => {
        this.setState({checkForget: true});
        await axios.post('abc' + `/api/v1/users/forget${this.state.email.value}`);
    };

    render() {
        const {history} = this.props;
        if (this.props.isAuth) {
            history.push("/dashboard");
            return <div></div>;
        }

        let loader = (
            <div>
                <Backdrop show={true}/>
                <Loader/>
            </div>
        );
        if (!this.state.isLoaded) {
            return <div></div>;
        }
        return (
            <div>
                <DynamicWeather data={this.state.data} height={parseInt(1080)}/>
                <div className="Signup__Container SignIn">
                    {!!this.props.loading && loader}

                    <div className="Signup flex flex__column">
                        <div className="title-box">
                            <p>Sign In</p>
                        </div>
                        <div className="Signup-body">
                            <form className="Signup-form flex flex__column">
                                <div className="Signup-form-field flex flex__column">
                                    <label htmlFor="email">Email: </label>
                                    <input name="email" placeholder="Email" className={this.state.email.cssClass}
                                           value={this.state.email.value}
                                           onChange={this.onChange}></input>
                                </div>
                                <div className="Signup-form-field flex flex__column">
                                    <label htmlFor="password">Password: </label>
                                    <input name="password" type="password" placeholder="Password"
                                           value={this.state.password.value} className={this.state.password.cssClass}
                                           onChange={this.onChange}></input>
                                </div>
                                {!!this.props.error &&
                                <p className="color--red error-message">{this.getErrorMessage(this.props.error.request.status)}</p>}
                                {this.state.checkForget &&
                                <p className="color--red error-message">We have sent an email for you to reset your
                                    passwords</p>}
                                <div className="login-fotpas" onClick={this.props.openModal}><Link to='/reset' className="switchSignup">Forgot Password?</Link></div>
                                <button className="submit-btn login-btn" onClick={this.handleSubmit}>Login</button>
                                <div className="other-signup-field">
                                </div>
                            </form>
                            <div className="switchToSignup">
                                <p>Don't have an account ?</p>
                                <Link to='/sign-up' className="switchSignup"><p>Sign Up</p></Link>
                            </div>
                        </div>
                    </div>
                    {/*<Modal className="modal--offer" show={this.props.isModalOpen} modalClosed={this.modalClose}>*/}
                    {/*<ForgetPassword closeModal={this.modalClose} email={this.state.email.value} onChange={this.onChange}*/}
                    {/*handleSubmit={this.handleSubmitForgetMessage}/>*/}
                    {/*</Modal>*/}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(action.auth(email, password, false)),
        // authFBSuccess: (user, email, images, firstName, lastName, ID, accessToken) => dispatch(action.socialFBAuth(user, email, images, firstName, lastName, ID, accessToken)),
        // authGoogleSuccess: (user, email, images, firstName, lastName, ID, accessToken) => dispatch(action.socialGoogleAuth(user, email, images, firstName, lastName, ID, accessToken)),
        // socialLogin: (user, userId, token) => dispatch(action.googleAuthLogin(user, userId, token)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
