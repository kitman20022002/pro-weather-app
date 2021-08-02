import React from 'react';
import Input from '../Input/Input';
import './Form.css';
import { connect } from 'react-redux';
import { ReCaptcha } from 'react-recaptcha-google';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      validated: false,
      recaptchaToken: '',
      submitting: false,
    };
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }

  componentDidMount() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }

  verifyCallback(recaptchaToken) {
    // Here you will get the final recaptchaToken!!!
    this.setState({ validated: true, recaptchaToken });
  }

  onLoadRecaptcha() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }

  checkValidity = (value, rules, errorMessage) => {
    let errorMsg = '';
    const isValid = true;
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
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      if (!(pattern.test(value) && isValid)) {
        errorMsg = errorMessage.email;
      }
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      if (!(pattern.test(value) && isValid)) {
        errorMsg = errorMessage.isNumeric;
      }
    }

    if (rules.required) {
      if (!(value.trim() !== '' && isValid)) {
        errorMsg = errorMessage.required;
      }
    }

    return errorMsg;
  };

  handleSubmit = async (e) => {
    const { data, validated, recaptchaToken } = this.state;
    const { validate, formSubmit } = this.props;
    e.preventDefault();
    let shouldSubmit = true;
    const formData = { ...data };
    for (const dat in formData) {
      const errorMsg = this.checkValidity(
        data[dat].value,
        data[dat].validation,
        data[dat].errorMessage,
      );
      formData[dat].valid = errorMsg === '';
      formData[dat].error = errorMsg;
      if (errorMsg !== '') {
        shouldSubmit = false;
      }
    }

    this.setState({ data: formData });
    if (validate) {
      if (shouldSubmit && validated) {
        this.setState({ submitting: true });
        formSubmit(data, recaptchaToken);
      }
    } else if (shouldSubmit) {
      this.setState({ submitting: true });
      formSubmit(data, null);
    }
    this.setState({ submitting: false });
  };

  onChange = (e) => {
    const { data } = this.state;
    const updatedFormElement = {
      ...data,
    };
    updatedFormElement[e.target.name].value = e.target.value;
    updatedFormElement[e.target.name].valid = true;
    this.setState({ data: updatedFormElement });
  };

  getErrorMessage = (message) => {
    switch (message) {
      case 204:
        return 'Incorrect Username or password';
      case 302:
        return 'Email has been taken';
      case 400:
        return 'Incorrect Username or password';
      case 401:
        return 'Incorrect Username or password';
      default:
        return 'Server Error';
    }
  };

  render() {
    const { data } = this.state;
    const { error, validate, loading, btnText } = this.props;
    const loader = <div className="loader-a" />;
    return (
      <form className="form--default  flex flex__column" onSubmit={this.handleSubmit}>
        {Object.keys(data).map((element, index) => (
          <Input
            key={index}
            name={element}
            label={element.charAt(0).toUpperCase() + element.slice(1)}
            type={data[element].type}
            placeholder={data[element].elementConfig.placeholder}
            value={data[element].value}
            cssClass={data[element].cssClass}
            valid={data[element].valid}
            error={data[element].error}
            onChange={this.onChange}
          />
        ))}
        {!!error && (
          <p className="color--red error-message">{this.getErrorMessage(error.request.status)}</p>
        )}
        {validate && (
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
        )}
        <button
          type="submit"
          className="submit-btn login-btn"
          onClick={this.handleSubmit}
          disabled={loading}
        >
          {loading && loader}
          {btnText}
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, null)(Form);
