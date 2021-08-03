import React from 'react';
import './Modal.css';

import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
  componentDidMount() {
    const { show } = this.props;
    if (show) {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  shouldComponentUpdate(nextProps) {
    const { show, children } = this.props;
    return nextProps.show !== show || nextProps.children !== children;
  }

  render() {
    const { show, modalClosed, children } = this.props;
    return (
      <>
        <Backdrop show={show} click={modalClosed} />
        <div
          className={`Modal ${this.props.class}`}
          style={{
            transform: show ? 'translateY(0)' : 'translateY(-200vh)',
            opacity: show ? '1' : 0,
          }}
        >
          {children}
        </div>
      </>
    );
  }
}

export default Modal;
