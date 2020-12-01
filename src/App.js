import React from 'react';
import './App.css';
import {Route, withRouter,Switch} from 'react-router-dom';
import Weather from "./pages/Weather/Weather";
import Settings from "./pages/Settings/Settings";
import Logout from "./containers/Auth/Logout/Logout";
import {loadReCaptcha} from 'react-recaptcha-google'
import * as action from "./store/actions";
import {connect} from "react-redux";
import Login from "./pages/Login/Login";

import SignUp from "./pages/SignUp/SignUp";
import Reset from "./pages/Reset/Reset";
import ProtectedRoute from "./routes/ProtectedRoute/ProtectedRoute";
import Forgot from "./pages/Forgot/Forgot";
import NotFound from "./pages/NotFound/NotFound";

class App extends React.Component {
    //https://rawgit.com/darkskyapp/skycons/master/skycons.js
    //https://codepen.io/Gerwinnz/pen/RVzrRG
    componentDidMount() {
        loadReCaptcha();
        // this.props.onTryAutoSettings();
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/reset-password/:token" exact component={Reset}/>
                <Route path="/forgot" exact component={Forgot}/>
                <Route path="/sign-up" exact component={SignUp}/>
                <ProtectedRoute path="/dashboard" exact component={Weather}/>
                <ProtectedRoute path="/settings" exact component={Settings}/>
                <Route path="/logout" exact component={Logout}/>
                <Route path="/login" component={Login}/>
                <Route component={NotFound} />
            </Switch>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onTryAutoSettings: () => dispatch(action.getSettings()),
        onTryAutoSignup: () => dispatch(action.authCheckState()),
    };
};
export default withRouter(connect(null, mapDispatchToProps)(App));
