import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ErrorPage from "./components/pages/ErrorPage";
import PrivateRoutes from "./components/routes/PrivateRoutes";
import PublicRoutes from "./components/routes/PublicRoutes";

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
        <PrivateRoutes
          location={location}
          history={history}
          showContent={showMainContent}
        />
        <PublicRoutes location={location} />
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
