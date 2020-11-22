import React from "react";
import Input from "../Input/Input";
import './Form.css';
import {connect} from "react-redux";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
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

    handleSubmit = (e) => {
        e.preventDefault();
        let shouldSubmit = true;
        const formData = {...this.state.data};
        for (let dat in formData) {
            const isValid = this.checkValidity(this.state.data[dat].value, this.state.data[dat].validation);
            formData[dat].valid = isValid;
            if (isValid === false) {
                shouldSubmit = false;
            }
        }
        this.setState({data: formData});
        if (shouldSubmit) {
            this.props.formSubmit(this.state.data);
        }
    };

    onChange = (e) => {
        const updatedFormElement = {
            ...this.state.data
        };
        updatedFormElement[e.target.name].value = e.target.value;
        this.setState({data: updatedFormElement});
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

    render() {
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
                                   onChange={this.onChange}
                        />
                    )
                })}
                {!!this.props.error &&
                <p className="color--red error-message">{this.getErrorMessage(this.props.error.request.status)}</p>}
                <button type={"submit"} className="submit-btn login-btn"
                        onClick={this.handleSubmit}>{this.props.btnText}</button>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
    };
};
export default connect(mapStateToProps, null)(Form);
