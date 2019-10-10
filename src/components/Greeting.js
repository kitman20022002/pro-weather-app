import React from "react";

class Greeting extends React.Component {
    constructor(props){
        super(props);
        this.state = {isToggleOn: true};
        this.printMessage = this.printMessage.bind(this);
    }

    printMessage() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.printMessage}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
        );
    }
}

export default Greeting;
