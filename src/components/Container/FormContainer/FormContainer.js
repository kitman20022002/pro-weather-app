import React from 'react';
import './FormContainer.css';

const FormContainer = (props) => {
  const { text, children } = props;
  return (
    <div className="form-container--outer">
      <div className="form-container--default">
        <div className="title-box">
          <p>{text}</p>
        </div>
        {children}
      </div>
    </div>
  );
};
export default FormContainer;
