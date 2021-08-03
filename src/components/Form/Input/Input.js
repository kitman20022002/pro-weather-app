import React from 'react';

class Input extends React.Component {
  render() {
    const { type, name, label, placeholder, valid, onChange, error } = this.props;
    const { value, cssClass } = this.state;
    const extraAtt = type === 'password' ? 'on' : 'off';
    return (
      <div className="flex flex__column form--group">
        <label htmlFor={name}>{label}: </label>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          className={[cssClass, +!valid ? 'error-input' : ''].join(' ')}
          onChange={onChange}
          autoComplete={extraAtt}
        />
        {!valid && <p className="color--red error-message">{error}</p>}
      </div>
    );
  }
}

export default Input;
