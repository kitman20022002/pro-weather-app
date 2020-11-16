import React from 'react';
import './Modal.css';

import Backdrop from "../Backdrop/Backdrop";

class Modal extends React.Component {

    componentDidMount() {
        if(this.props.show){
            document.body.style.overflow = 'hidden';
        }
    }

    componentWillUnmount() {
        document.body.style.overflow = 'unset';
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {

    }

    render() {

        return (
            <React.Fragment>
                <Backdrop show={this.props.show} click={this.props.modalClosed}/>
                <div className={"Modal " + this.props.class } style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-200vh)',
                    opacity: this.props.show ? '1' : 0,
                }}>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}

export default Modal;
