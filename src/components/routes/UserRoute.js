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
  // ownProps
  component: PropTypes.func.isRequired,
  // mapStateToProps
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: !!getToken(state)
});

export default connect(mapStateToProps)(UserRoute);
