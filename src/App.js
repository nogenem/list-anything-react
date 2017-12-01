import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import HomePage from "./components/pages/HomePage";
import DashboardPage from "./components/pages/DashboardPage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import TopNavigation from "./components/navigation/TopNavigation";
import MainContainer from "./components/containers/MainContainer";

import GuestRoute from "./components/routes/GuestRoute";
import UserRoute from "./components/routes/UserRoute";

// className="ui container"
class App extends Component {
  state = {
    menuVisible: false
  };

  toggleMenu = () => this.setState({ menuVisible: !this.state.menuVisible });

  render() {
    const { location, isAuthenticated } = this.props;
    const { menuVisible } = this.state;
    return (
      <div>
        {isAuthenticated && <TopNavigation toggleMenu={this.toggleMenu} />}
        {isAuthenticated && (
          <MainContainer menuVisible={menuVisible}>
            <UserRoute
              location={location}
              path="/dashboard"
              exact
              component={DashboardPage}
            />
          </MainContainer>
        )}

        <Route location={location} path="/" exact component={HomePage} />
        <GuestRoute
          location={location}
          path="/login"
          exact
          component={LoginPage}
        />
        <GuestRoute
          location={location}
          path="/signup"
          exact
          component={SignupPage}
        />
        <GuestRoute
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
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  };
}

export default connect(mapStateToProps)(App);
