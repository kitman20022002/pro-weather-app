import React from 'react';

function Input(props) {
  const { type, name, label, placeholder, valid, onChange, error, cssClass, value } = props;
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

export default Input;
