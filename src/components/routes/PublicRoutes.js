import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import GuestRoute from "../routes/GuestRoute";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ConfirmationPage from "../pages/ConfirmationPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

const PublicRoutes = ({ location }) => (
  <div id="public-routes-container">
    <Route location={location} path="/" exact component={HomePage} />
    <GuestRoute location={location} path="/login" exact component={LoginPage} />
    <GuestRoute
      location={location}
      path="/signup"
      exact
      component={SignupPage}
    />
    <Route
      location={location}
      path="/confirmation/:token"
      exact
      component={ConfirmationPage}
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
  }).isRequired
};

export default PublicRoutes;
