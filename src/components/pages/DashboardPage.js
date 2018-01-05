import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import isEmpty from "lodash.isempty";

import CustomMessage from "../messages/CustomMessage";
import AddSubjectCtA from "../ctas/AddSubjectCtA";
import { getConfirmed } from "../../reducers/user";
import { getSubjectsArray } from "../../reducers/subjects";

const DashboardPage = ({ isConfirmed, hasSubjects }) => (
  <Segment basic>
    {!isConfirmed && (
      <CustomMessage
        header={"Please, verify your email to unlock awesomeness"}
        type={"info"}
      />
    )}
    {isConfirmed && (
      <CustomMessage header={"Welcome to ListAnything!"} type={"info"} />
    )}
    {isConfirmed && !hasSubjects && <AddSubjectCtA />}
  </Segment>
);

DashboardPage.propTypes = {
  // mapStateToProps
  isConfirmed: PropTypes.bool.isRequired,
  hasSubjects: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isConfirmed: !!getConfirmed(state),
  hasSubjects: !isEmpty(getSubjectsArray(state))
});

export const UnconnectedDashboardPage = DashboardPage;
export default connect(mapStateToProps)(DashboardPage);
