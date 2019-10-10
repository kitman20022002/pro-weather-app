import React from "react";
import '../Backdrop/Backdrop.css';

const Backdrop = (props) => (
    props.show ? <span className={"backdrop"} onClick={props.click}></span> : null
);
export default Backdrop;
