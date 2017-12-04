import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { getToken } from "../../reducers/user";

const HomePage = ({ isAuthenticated }) => (
  <div>
    {!isAuthenticated ? <Redirect to="/login" /> : <Redirect to="/dashboard" />}
  </div>
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!getToken(state)
  };
}

export default connect(mapStateToProps)(HomePage);
