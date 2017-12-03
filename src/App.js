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
import NewSubjectPage from "./components/pages/NewSubjectPage";
import NewSubjectDataPage from "./components/pages/NewSubjectDataPage";
import SubjectPage from "./components/pages/SubjectPage";

import TopNavigation from "./components/navigation/TopNavigation";
import MainContainer from "./components/containers/MainContainer";

import GuestRoute from "./components/routes/GuestRoute";
import UserRoute from "./components/routes/UserRoute";

import { fetchSubjects } from "./actions/subjects";

// className="ui container"
class App extends Component {
  state = {
    menuVisible: false
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.fetchSubjects();
    }
  }

  toggleMenu = () => this.setState({ menuVisible: !this.state.menuVisible });

  hideMenu = () => this.setState({ menuVisible: false });

  render() {
    const { location, isAuthenticated } = this.props;
    const { menuVisible } = this.state;
    const showMainContent =
      isAuthenticated && !location.pathname.startsWith("/confirmation");

    return (
      <div>
        {showMainContent && (
          <TopNavigation
            toggleMenu={this.toggleMenu}
            hideMenu={this.hideMenu}
          />
        )}

        <MainContainer
          menuVisible={menuVisible}
          hideMenu={this.hideMenu}
          style={{ display: showMainContent ? "block" : "none" }}
        >
          <UserRoute
            location={location}
            path="/dashboard"
            exact
            component={DashboardPage}
          />
          <UserRoute
            location={location}
            path="/subjects/new"
            exact
            component={NewSubjectPage}
          />
          <UserRoute
            location={location}
            path="/subject/:_id"
            exact
            component={SubjectPage}
          />
          <UserRoute
            location={location}
            path="/subject-data/new"
            exact
            component={NewSubjectDataPage}
          />
        </MainContainer>

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
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  fetchSubjects: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  };
}

export default connect(mapStateToProps, { fetchSubjects })(App);
