import React from 'react';
import './App.css';
import {Route, withRouter} from 'react-router-dom';
import Weather from "./containers/Weather/Weather";
import Settings from "./containers/Settings/Settings";
import Logout from "./containers/Auth/Logout/Logout";
import {loadReCaptcha} from 'react-recaptcha-google'
import * as action from "./store/actions";
import {connect} from "react-redux";


class App extends React.Component {

    componentDidMount() {
        loadReCaptcha();
    }

    render() {
        return (
            <div>
                <Route path="/" exact component={Weather}/>
                <Route path="/settings" exact component={Settings}/>
                <Route path="/logout" exact component={Logout}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(action.authCheckState())
    };
};
export default withRouter(connect(null, mapDispatchToProps)(App));
