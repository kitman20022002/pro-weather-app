import React from "react";
import './FormContainer.css';
import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";

class FormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formType: <SignIn submitForm={this.submitForm}/>,
            activeItem: 0,
            shouldRender: true,
        };
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({shouldRender:false});
    };

    changeToSignIn = () => {
        this.setState({formType: <SignIn submitForm={this.submitForm}/>, activeItem: 0});
    };

    changeToSignUp = () => {
        this.setState({formType: <SignUp submitForm={this.submitForm}/>, activeItem: 1});
    };


    render() {
        let forms;
        if (this.state.shouldRender) {
            forms = (<div className="container container--signup">
                <div className="nav">
                    <ul className="links">
                        <li className="signin-active signin-inactive"><a onClick={this.changeToSignIn}
                                                                         href='#'
                                                                         className={this.state.activeItem === 0 ? 'active btn' : 'btn'}>Sign
                            in</a></li>
                        <li className=" signup-active signup-inactive"><a onClick={this.changeToSignUp}
                                                                          className={this.state.activeItem === 1 ? 'active btn' : 'btn'}>Sign
                            up </a></li>
                    </ul>

                </div>
                {this.state.formType}
            </div>);
        } else {
            forms = null;
        }
        return forms;
    }
}

export default FormContainer;
