import React from "react";
import Input from "../Input/Input";
import './Form.css';
import {connect} from "react-redux";
import {ReCaptcha} from "react-recaptcha-google";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            validated: false,
            recaptchaToken: '',
            submitting: false
        };
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
    }

    componentDidMount() {
        if (this.captchaDemo) {
            console.log("started, just a second...");
            this.captchaDemo.reset();
        }
    }

    verifyCallback(recaptchaToken) {
        // Here you will get the final recaptchaToken!!!
        this.setState({'validated': true, 'recaptchaToken': recaptchaToken});
    }

    onLoadRecaptcha() {
        if (this.captchaDemo) {
            this.captchaDemo.reset();
        }
    }

    checkValidity(value, rules, errorMessage) {
        let errorMsg = '';
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.min) {
            if (!(value.length >= rules.min && isValid)) {
                errorMsg = errorMessage.min;
            }
        }

        if (rules.max) {
            if (!(value.length <= rules.max && isValid)) {
                errorMsg = errorMessage.max;
            }
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            if (!(pattern.test(value) && isValid)) {
                errorMsg = errorMessage.email
            }
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            if (!(pattern.test(value) && isValid)) {
                errorMsg = errorMessage.isNumeric
            }
        }

        if (rules.required) {
            if (!(value.trim() !== '' && isValid)) {
                errorMsg = errorMessage.required;
            }
        }

        return errorMsg;
    }

    handleSubmit = async  (e) => {
        e.preventDefault();
        let shouldSubmit = true;
        const formData = {...this.state.data};
        for (let dat in formData) {
            const errorMsg = this.checkValidity(this.state.data[dat].value, this.state.data[dat].validation, this.state.data[dat].errorMessage);
            formData[dat].valid = errorMsg === '';
            formData[dat].error = errorMsg;
            if (errorMsg !== '') {
                shouldSubmit = false;
            }
        }

        this.setState({data: formData});
        if (this.props.validate) {
            if (shouldSubmit && this.state.validated) {
                this.setState({submitting: true});
                 this.props.formSubmit(this.state.data, this.state.recaptchaToken);
            }
        } else {
            if (shouldSubmit) {
                this.setState({submitting: true});
                 this.props.formSubmit(this.state.data, null);
            }
        }
        this.setState({submitting: false});
    };

    onChange = (e) => {
        const updatedFormElement = {
            ...this.state.data
        };
        updatedFormElement[e.target.name].value = e.target.value;
        updatedFormElement[e.target.name].valid = true;
        this.setState({data: updatedFormElement});
    };

    getErrorMessage = (message) => {
        switch (message) {
            case 204:
                return "Incorrect Username or password";
            case 302:
                return "Email has been taken";
            case 400:
                return "Incorrect Username or password";
            case 401:
                return "Incorrect Username or password";
            default:
                return "Server Error";
        }
    };

    render() {
        const loader = (<div className={"loader-a"}></div>);
        return (
            <form className="form--default  flex flex__column" onSubmit={this.handleSubmit}>
                {Object.keys(this.state.data).map((element, index) => {
                    return (<Input key={index}
                                   name={element}
                                   label={element.charAt(0).toUpperCase() + element.slice(1)}
                                   type={this.state.data[element].type}
                                   placeholder={this.state.data[element].elementConfig.placeholder}
                                   value={this.state.data[element].value}
                                   cssClass={this.state.data[element].cssClass}
                                   valid={this.state.data[element].valid}
                                   error={this.state.data[element].error}
                                   onChange={this.onChange}
                        />
                    )
                })}
                {!!this.props.error &&
                <p className="color--red error-message">{this.getErrorMessage(this.props.error.request.status)}</p>}
                {this.props.validate && <ReCaptcha
                    ref={(el) => {
                        this.captchaDemo = el;
                    }}
                    size="normal"
                    data-theme="dark"
                    render="explicit"
                    sitekey="6LcKzbwUAAAAACf9O0wojDUqc0EM-r4RX-xqDR5E"
                    onloadCallback={this.onLoadRecaptcha}
                    verifyCallback={this.verifyCallback}
                />}
                <button type={"submit"} className="submit-btn login-btn"
                        onClick={this.handleSubmit}
                        disabled={this.props.loading}>{this.props.loading && loader}{this.props.btnText}</button>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
    };
};
export default connect(mapStateToProps, null)(Form);
