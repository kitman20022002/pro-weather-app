import React from 'react';
import './FormContainer.css';

const FormContainer = (props) => (
  <div className="form-container--outer">
    <div className="form-container--default">
      <div className="title-box">
        <p>{props.text}</p>
      </div>
      {props.children}
    </div>
  </div>
);

export default FormContainer;
