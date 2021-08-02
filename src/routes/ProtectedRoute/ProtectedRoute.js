import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
// https://stackoverflow.com/questions/43520498/react-router-private-routes-redirect-not-working
const ProtectedRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isAuth: state.auth.token !== null,
});

export default connect(mapStateToProps, null, null, { pure: false })(ProtectedRoute);
