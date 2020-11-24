import React from 'react';
import {Link} from 'react-router-dom';
import './Login.css';
import {connect} from "react-redux";
import * as action from "../../store/actions";
import DynamicWeather from "../../components/DynamicWeather/DynamicWeather";
import {getWeather} from "../../api/weatherapi";
import Form from "../../components/Form/Form/Form";
import FormContainer from "../../components/Container/FormContainer/FormContainer";
import logo from '../../img/weather.png'

class Login extends React.Component {
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
                        email: "Email invalid",
                        required: 'Email is required',
                    },
                    valid: true,
                    value: '',
                    cssClass: '',
                    error: '',
                    type: 'input'
                },
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
            },
            data: {},
            loading: true,
        };
        this.loadDefaultData();
    }


    async loadDefaultData() {
        let result = await getWeather("sydney");
        result.data.daily.data = result.data.daily.data.splice(0, 5);
        this.setState({data: result.data, loading: false, error: false});
    }

    handleSubmit = (data, token = null) => {
        this.props.onAuth(data.email.value, data.password.value, token);
    };

    render() {
        const {history} = this.props;
        if (this.props.isAuth) {
            history.push("/dashboard");
            return <div/>;
        }

        return (
            <div>
                {this.state.loading ? <img className={'background__img'}
                                           src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqFUoOzaBd_QpPk6HpTIOZZYXdqVUQJur72g&usqp=CAU'}
                                           alt={'bg'}/>
                    : <DynamicWeather data={this.state.data} height={parseInt(1080)}/>}
                <FormContainer text={"Sign In"}>
                    <div className={"login-img__container"}>
                        <img src={logo} alt={"weaths"} className={"login_img"}/>
                    </div>
                    <div className="Signup-body">
                        <Form data={this.state.formData} formSubmit={this.handleSubmit} btnText={"Login"}
                              validate={this.props.authFailTimes > 2}/>
                        <div className="login-fotpas" onClick={this.props.openModal}>
                            <Link to='/forgot' className="switchSignup">Forgot Password?</Link>
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

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
        authFailTimes: state.auth.authFailTimes
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, token) => dispatch(action.auth(email, password, false, token)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
