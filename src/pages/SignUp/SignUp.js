import React from 'react';
import {Link} from 'react-router-dom';
import './SignUp.css';
import {connect} from "react-redux";
import * as action from "../../store/actions";
import DynamicWeather from "../../components/DynamicWeather/DynamicWeather";
import {getWeather} from "../../api/weatherapi";
import Form from "../../components/Form/Form/Form";
import FormContainer from "../../components/Container/FormContainer/FormContainer";
import logo from "../../img/weather.png";

class SignUp extends React.Component {
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
                    error: '',
                    type: 'input'
                },
                password: {
                    elementConfig: {
                        placeholder: 'Password'
                    },
                    validation: {
                        required: true,
                        min: 7
                    },
                    errorMessage: {
                        required: 'Password is required',
                        min: 'Password is minimum length is 7',
                    },
                    valid: true,
                    value: '',
                    cssClass: '',
                    error: '',
                    type: 'password'
                },
                city: {
                    elementConfig: {
                        placeholder: 'City'
                    },
                    validation: {
                        required: true,
                    },
                    errorMessage: {
                        required: 'City is required',
                    },
                    valid: true,
                    value: '',
                    cssClass: '',
                    error: '',
                    type: 'input'
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
        this.setState({data: result.data, loading: false, error: false});
    }

    handleSubmit = (data, token) => {
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
                <FormContainer text={"Sign Up"}>
                    <div className={"login-img__container"}>
                        <img src={logo} alt={"weaths"} className={"login_img"}/>
                    </div>
                    <div className="Signup-body">
                        <Form data={this.state.formData} formSubmit={this.handleSubmit} btnText={"Sign Up"}
                              validate={true}/>
                        <div className="switchToSignup">
                            <p>Don't have an account ?</p>
                            <Link to='/login' className="switchSignup"><p>Sign In</p></Link>
                        </div>
                    </div>
                </FormContainer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, token) => dispatch(action.auth(email, password, true, token)),
        // authFBSuccess: (user, email, images, firstName, lastName, ID, accessToken) => dispatch(action.socialFBAuth(user, email, images, firstName, lastName, ID, accessToken)),
        // authGoogleSuccess: (user, email, images, firstName, lastName, ID, accessToken) => dispatch(action.socialGoogleAuth(user, email, images, firstName, lastName, ID, accessToken)),
        // socialLogin: (user, userId, token) => dispatch(action.googleAuthLogin(user, userId, token)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
