import React from "react";

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
    }

    render() {
        return (
            <div className="flex flex__column form--group">
                <label htmlFor={this.props.name}>{this.props.label}: </label>
                <input name={this.props.name} type={this.props.type} placeholder={this.props.placeholder}
                       value={this.state.value} className={[this.state.cssClass, + !this.props.valid ? 'error-input' : ''].join(' ')}
                       onChange={this.props.onChange}/>
                {!this.props.valid &&
                <p className="color--red error-message">{this.props.error}</p>}
            </div>
        );
    }
}

export default Input;
