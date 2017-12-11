import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import isEmpty from "lodash.isempty";

import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import WelcomeMessage from "../messages/WelcomeMessage";
import AddSubjectCtA from "../ctas/AddSubjectCtA";
import { getConfirmed } from "../../reducers/user";
import { getSubjectsArray } from "../../reducers/subjects";

const DashboardPage = ({ isConfirmed, hasSubjects }) => (
  <Segment basic>
    {!isConfirmed && <ConfirmEmailMessage />}
    {isConfirmed && !hasSubjects && <AddSubjectCtA />}
    {isConfirmed && hasSubjects && <WelcomeMessage />}
  </Segment>
);

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  hasSubjects: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isConfirmed: !!getConfirmed(state),
  hasSubjects: !isEmpty(getSubjectsArray(state))
});

export default connect(mapStateToProps)(DashboardPage);
