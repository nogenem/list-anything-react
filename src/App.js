import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import ErrorPage from "./components/pages/ErrorPage";
import PrivateRoutes from "./components/routes/PrivateRoutes";
import PublicRoutes from "./components/routes/PublicRoutes";

import HomePage from "./components/pages/HomePage";
import ConfirmationPage from "./components/pages/ConfirmationPage";

import { fetchAllSubjects } from "./actions/subjects";
import { getEmail } from "./reducers/user";

import handleServerErrors from "./utils/handleServerErrors";

import "./App.css";

class App extends Component {
  state = {
    loading: true,
    error: null
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
      .catch(err =>
        this.setState({ error: handleServerErrors(err), loading: false })
      );
  };

  render() {
    const { location, isAuthenticated, history } = this.props;
    const { error, loading } = this.state;
    const showPrivateRoutes =
      isAuthenticated &&
      !loading &&
      !error &&
      !location.pathname.startsWith("/confirmation");
    const showPublicRoutes = !isAuthenticated;

    return (
      <div id="app-container">
        {error && <ErrorPage error={error.global} />}

        <Route location={location} path="/" exact component={HomePage} />
        <Route
          location={location}
          path="/confirmation/:token"
          exact
          component={ConfirmationPage}
        />

        <PrivateRoutes
          location={location}
          history={history}
          showContent={showPrivateRoutes}
        />
        <PublicRoutes location={location} showContent={showPublicRoutes} />
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
