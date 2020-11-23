import React from 'react';
import {Link} from 'react-router-dom';
import './Forgot.css';
import DynamicWeather from "../../components/DynamicWeather/DynamicWeather";
import {getWeather} from "../../api/weatherapi";
import {forgotPassword} from "../../api/user";
import Form from "../../components/Form/Form/Form";
import FormContainer from "../../components/Container/FormContainer/FormContainer";


class Forgot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                email: {
                    elementConfig: {
                        placeholder: 'Email'
                    },
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    errorMessage: {
                        email: "Not valid Email",
                        required: 'Email is required',
                    },
                    valid: true,
                    value: '',
                    cssClass: '',
                    error: ''
                },
            },
            checkForget: false,
            data: {},
            loading: true,
        };
        this.loadDefaultData();
    }

    async loadDefaultData() {
        let result = await getWeather("sydney");
        result.data.daily.data = result.data.daily.data.splice(0, 5);
        this.setState({data: result.data, loading: true, error: false});
    }

    handleSubmitForgetMessage = async (data) => {
        let res = await forgotPassword({'email': data.email.value});
        if (res) {
            this.setState({checkForget: true});
        }
    };

    render() {
        return (
            <div>
                {this.state.loading ? <img className={'background__img'}
                                           src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqFUoOzaBd_QpPk6HpTIOZZYXdqVUQJur72g&usqp=CAU'}
                                           alt={'bg'}/>
                    : <DynamicWeather data={this.state.data} height={parseInt(1080)}/>}
                <FormContainer text={"Reset Password"}>
                    <div className="Signup-body">
                        {this.state.checkForget ?
                            <p className="color--white">We have sent an email for you to reset your
                                passwords</p>
                            :
                            <Form data={this.state.formData} formSubmit={this.handleSubmitForgetMessage}
                                  btnText={"Login"}/>
                        }
                        <div className="login-fotpas">
                            <Link to='/login' className="switchSignup">Go back -></Link>
                        </div>
                        <div className="switchToSignup">
                            <p>Don't have an account ?</p>
                            <Link to='/sign-up' className="switchSignup"><p>Sign Up</p></Link>
                        </div>
                    </div>
                </FormContainer>
            </div>
        )
    }
}

export default Forgot;
