import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { fetchSubjects } from "../../actions/subjects";

class UserRoute extends React.Component {
  componentDidMount = () => this.props.fetchSubjects();

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
  isAuthenticated: PropTypes.bool.isRequired,
  fetchSubjects: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps, { fetchSubjects })(UserRoute);
