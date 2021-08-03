import React from 'react';

class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    this.printMessage = this.printMessage.bind(this);
  }

  printMessage() {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn,
    }));
  }

  render() {
    const { isToggleOn } = this.state;
    return (
      <button type="button" onClick={this.printMessage}>
        {isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

export default Greeting;
