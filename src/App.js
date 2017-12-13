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
import SubjectPage from "./components/pages/SubjectPage";
import NewSubjectDataPage from "./components/pages/NewSubjectDataPage";
import SubjectDataPage from "./components/pages/SubjectDataPage";
import ErrorPage from "./components/pages/ErrorPage";
import SearchPage from "./components/pages/SearchPage";

import MainContentContainer from "./components/containers/MainContentContainer";

import GuestRoute from "./components/routes/GuestRoute";
import UserRoute from "./components/routes/UserRoute";

import { fetchAllSubjects } from "./actions/subjects";
import { getEmail } from "./reducers/user";

import "./App.css";

class App extends Component {
  state = {
    loading: true,
    error: false
  };

  componentDidMount = () => {
    if (this.props.isAuthenticated) {
      this.loadSubjects();
    }
  };

  componentWillReceiveProps = nextProps => {
    if (!this.props.isAuthenticated && nextProps.isAuthenticated) {
      this.setState({ loading: true });
      this.loadSubjects();
    }
  };

  loadSubjects = () => {
    this.props
      .fetchAllSubjects()
      .then(() => this.setState({ loading: false }))
      .catch(() => this.setState({ error: true }));
  };

  render() {
    const { location, isAuthenticated, history } = this.props;
    const { error, loading } = this.state;
    const showMainContent =
      isAuthenticated &&
      !loading &&
      !error &&
      !location.pathname.startsWith("/confirmation");

    return (
      <div id="app-container">
        {error && <ErrorPage />}
        <MainContentContainer history={history} showContent={showMainContent}>
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
            path="/subject-datas/new"
            exact
            component={NewSubjectDataPage}
          />
          <UserRoute
            location={location}
            path="/subject-data/:_id"
            exact
            component={SubjectDataPage}
          />
          <UserRoute
            location={location}
            path="/search"
            exact
            component={SearchPage}
          />
        </MainContentContainer>

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
  // ownProps
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  // mapStateToProps
  isAuthenticated: PropTypes.bool.isRequired,
  // mapDispatchToProps
  fetchAllSubjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: !!getEmail(state)
});

export default connect(mapStateToProps, { fetchAllSubjects })(App);
