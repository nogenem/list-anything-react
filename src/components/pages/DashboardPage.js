import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import isEmpty from "lodash.isempty";

import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import AddSubjectCtA from "../ctas/AddSubjectCtA";
import { allSubjectsSelector } from "../../reducers/subjects";
import { fetchSubjects } from "../../actions/subjects";

class DashboardPage extends Component {
  componentDidMount = () => this.props.fetchSubjects();

  render() {
    const { isConfirmed, subjects } = this.props;
    return (
      <Segment basic>
        {!isConfirmed && <ConfirmEmailMessage />}
        {isConfirmed && isEmpty(subjects) && <AddSubjectCtA />}
      </Segment>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  fetchSubjects: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    subjects: allSubjectsSelector(state)
  };
}

export default connect(mapStateToProps, { fetchSubjects })(DashboardPage);
