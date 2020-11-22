import React from "react";
import "./SignIn.css";
import * as actions from "../../../store/actions";
import {connect} from "react-redux";
import Spinner from "../SignUp/SignUp";
import {ReCaptcha} from 'react-recaptcha-google';
import Form from "../Form/Form";

class SignIn extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            formData: {
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
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleChange = (e) => {
    //     const updatedFormElement = {
    //         ...this.state[e.target.name]
    //     };
    //
    //     let isValid = this.checkValidity(e.target.value, updatedFormElement.validation);
    //     if (!isValid) {
    //         updatedFormElement.cssClass = 'color--red';
    //     } else {
    //         updatedFormElement.cssClass = '';
    //     }
    //     updatedFormElement.value = e.target.value;
    //     this.setState({[e.target.name]: updatedFormElement});
    //
    // };

    // submitForm = (e) => {
    //     e.preventDefault();
    //     this.props.onAuth(this.state.email.value, this.state.password.value);
    // };

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     alert('Your favorite flavor is: ' + this.state.value);
    // };

    // getErrorMessage = (message) => {
    //     switch (message) {
    //         case 'INVALID_PASSWORD':
    //             return "Incorrect Username or password";
    //         default:
    //             return message;
    //     }
    // };

    render() {
        let errorMessage = '';
        if (this.props.error) {
            let message = JSON.parse(this.props.error.request.response);
            errorMessage = <p className="color--red error-message">{this.getErrorMessage(message.error.message)}</p>;
        }

        let form = <Form data={this.state.formData}/>;

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

