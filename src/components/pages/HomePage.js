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
  // mapStateToProps
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: !!getToken(state)
});

export default connect(mapStateToProps)(HomePage);
