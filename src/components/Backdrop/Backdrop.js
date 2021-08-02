import React from 'react';
import './Backdrop.css';

const Backdrop = (props) =>
  props.show ? <span className="backdrop" onClick={props.click} /> : null;
export default Backdrop;
