import React from "react";
import PropTypes from "prop-types";

import GuestRoute from "../routes/GuestRoute";

import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

const PublicRoutes = ({ location, showContent }) => (
  <div
    id="public-routes-container"
    style={{ display: showContent ? "block" : "none" }}
  >
    <GuestRoute location={location} path="/login" exact component={LoginPage} />
    <GuestRoute
      location={location}
      path="/signup"
      exact
      component={SignupPage}
    />
    <GuestRoute
      location={location}
      path="/forgot_password"
      exact
      component={ForgotPasswordPage}
    />
    <GuestRoute
      location={location}
      path="/reset_password/:token"
      exact
      component={ResetPasswordPage}
    />
  </div>
);

PublicRoutes.propTypes = {
  // ownProps
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  showContent: PropTypes.bool.isRequired
};

export default PublicRoutes;
