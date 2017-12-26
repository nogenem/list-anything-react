import React from "react";
import PropTypes from "prop-types";

import UserRoute from "../routes/UserRoute";
import MainContentContainer from "../containers/MainContentContainer";

import DashboardPage from "../pages/DashboardPage";
import NewSubjectPage from "../pages/NewSubjectPage";
import SubjectPage from "../pages/SubjectPage";
import NewSubjectDataPage from "../pages/NewSubjectDataPage";
import SubjectDataPage from "../pages/SubjectDataPage";
import SearchPage from "../pages/SearchPage";

const PrivateRoutes = ({ location, history, showContent }) => (
  <MainContentContainer history={history} showContent={showContent}>
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
      path="/subject/:_id/add"
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
);

PrivateRoutes.propTypes = {
  // ownProps
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  showContent: PropTypes.bool.isRequired
};

export default PrivateRoutes;
