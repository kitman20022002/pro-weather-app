import React from 'react';
import {Link} from 'react-router-dom';
import './Reset.css';
import DynamicWeather from "../../components/DynamicWeather/DynamicWeather";
import {getWeather} from "../../api/weatherapi";
import {forgotPassword, resetPassword} from "../../api/user";
import Form from "../../components/Form/Form/Form";
import FormContainer from "../../components/Container/FormContainer/FormContainer";


class Reset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                password: {
                    elementConfig: {
                        placeholder: 'Password'
                    },
                    validation: {
                        required: true,
                    },
                    errorMessage: {
                        required: 'Password is required',
                    },
                    valid: true,
                    value: '',
                    cssClass: '',
                    error: ''
                },
                passwordConfirm: {
                    elementConfig: {
                        placeholder: 'Password'
                    },
                    validation: {
                        required: true,
                    },
                    errorMessage: {
                        required: 'Password Confirmed is required',
                    },
                    valid: true,
                    value: '',
                    cssClass: '',
                    error: ''
                },
            },
            resetSuccess: false,
            data: {},
            loading: true,
        };

    }

    handleSubmitReset = async (data) => {
        let res = await resetPassword({'password': data.password.value});
        if (res) {
            this.setState({resetSuccess: true});
        }
    };

    render() {
        return (
            <div>
                <img className={'background__img'}
                     src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqFUoOzaBd_QpPk6HpTIOZZYXdqVUQJur72g&usqp=CAU'}
                     alt={'bg'}/>
                <FormContainer text={"Reset Password"}>
                    {!this.state.resetSuccess ?
                        <div className="Signup-body">
                            <Form data={this.state.formData} formSubmit={this.handleSubmitReset}
                                  btnText={"Confirm"}/>
                        </div>
                        :
                        <div>
                            <p className="color--white">Password has been reset</p>
                            <div className="login-fotpas">
                                <Link to='/login' className="switchSignup">Return to Login</Link>
                            </div>
                        </div>
                    }
                </FormContainer>
            </div>
        )
    }
}

export default Reset;
