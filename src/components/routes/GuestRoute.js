import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { getToken } from "../../reducers/user";

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated ? <Component {...props} /> : <Redirect to="/dashboard" />
    }
  />
);

GuestRoute.propTypes = {
  // ownProps
  component: PropTypes.func.isRequired,
  // mapStateToProps
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: !!getToken(state)
});

export default connect(mapStateToProps)(GuestRoute);
