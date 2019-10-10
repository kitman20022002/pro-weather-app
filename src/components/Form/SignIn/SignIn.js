import React from "react";
import "./SignIn.css";
import * as actions from "../../../store/actions";
import {connect} from "react-redux";
import Spinner from "../SignUp/SignUp";
import {ReCaptcha} from 'react-recaptcha-google';

class SignIn extends React.Component {
    constructor(props, context) {
        super(props, context);
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
                value: 'kitmanwork@gmail.com',
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
                value: 'kitmanwork@gmail.com',
                cssClass: '',
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        if (this.captchaDemo) {
            console.log("started, just a second...")
            this.captchaDemo.reset();
        }
    }

    onLoadRecaptcha() {
        if (this.captchaDemo) {
            this.captchaDemo.reset();
        }
    }

    verifyCallback(recaptchaToken) {
        // Here you will get the final recaptchaToken!!!
        console.log(recaptchaToken, "<= your recaptcha token")
    }

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

    handleChange = (e) => {
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

    submitForm = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.email.value, this.state.password.value);
    };

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     alert('Your favorite flavor is: ' + this.state.value);
    // };

    onChange = (value) => {
        console.log("Captcha value:", value);
    };

    getErrorMessage = (message) => {
        switch (message) {
            case 'INVALID_PASSWORD':
                return "Incorrect Username or password";
            default:
                return message;
        }
    };

    render() {
        let errorMessage = '';
        if (this.props.error) {
            let message = JSON.parse(this.props.error.request.response);
            errorMessage = <p className="color--red error-message">{this.getErrorMessage(message.error.message)}</p>;
        }

        let form = (
            <form className="signup__form" onSubmit={this.submitForm}>
                <label>
                    Email:
                </label>
                <input type="text" name='email' className={this.state.email.cssClass} value={this.state.email.value}
                       onChange={this.handleChange}/>
                <label>
                    Password:
                </label>
                <input type="password" name='password' className={this.state.password.cssClass}
                       value={this.state.password.value}
                       onChange={this.handleChange}/>
                {errorMessage}
                <ReCaptcha
                    ref={(el) => {
                        this.captchaDemo = el;
                    }}
                    size="normal"
                    data-theme="dark"
                    render="explicit"
                    sitekey="6LcKzbwUAAAAACf9O0wojDUqc0EM-r4RX-xqDR5E"
                    onloadCallback={this.onLoadRecaptcha}
                    verifyCallback={this.verifyCallback}
                />
                {/*<p className="color--red">Email not correct</p>*/}
                <input type="submit" value="Submit"/>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner/>;
        }


        return form;
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password, false))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

