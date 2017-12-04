import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { getToken } from "../../reducers/user";

class UserRoute extends React.Component {
  render() {
    const { isAuthenticated, component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }
}

UserRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!getToken(state)
  };
}

export default connect(mapStateToProps)(UserRoute);
