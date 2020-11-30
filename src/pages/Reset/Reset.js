import React from 'react';
import {Link} from 'react-router-dom';
import './Reset.css';
import {resetPassword} from "../../api/user";
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
                    error: '',
                    type: 'password'
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
                    error: '',
                    type: 'password'
                },
            },
            resetSuccess: false,
            data: {},
            loading: true,
            errorMessage: '',
        };

    }

    handleSubmitReset = async (data) => {
        try {
            let res = await resetPassword({'password': data.password.value, 't': this.props.match.params.token});

            if (res) {
                this.setState({resetSuccess: true});
            } else {
                this.setState({resetSuccess: false, errorMessage: 'Unauthorized '});
            }
        } catch (e) {
            this.setState({resetSuccess: false, errorMessage: 'Unauthorized'});
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
                            {this.state.errorMessage !== '' &&
                            <p className={"color--red error-message"}>{this.state.errorMessage}</p>}
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
