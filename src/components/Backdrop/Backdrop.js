import React from 'react';
import './Backdrop.css';

const Backdrop = (props) => {
  const { show, click } = props;
  return show ? <span className="backdrop" onClick={click} /> : null;
};
export default Backdrop;
