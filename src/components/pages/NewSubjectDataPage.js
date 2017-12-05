import React, { Component } from "react";
import { Header, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import NewSubjectDataForm from "../forms/NewSubjectDataForm";
import { createSubjectData } from "../../actions/subjectData";
import { getSubjectId } from "../../reducers/currentSubject";

class NewSubjectDataPage extends Component {
  submit = data =>
    this.props
      .createSubjectData(data)
      .then(() => this.props.history.push(`/subject/${this.props.subjectId}`));

  render() {
    const { subjectId } = this.props;
    if (!subjectId) return <div />;
    return (
      <Segment style={{ maxWidth: 500, margin: "10px auto" }}>
        <Header as="h2" color="teal" textAlign="center">
          Add new Subject Data
        </Header>
        <NewSubjectDataForm submit={this.submit} />
      </Segment>
    );
  }
}

NewSubjectDataPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  createSubjectData: PropTypes.func.isRequired,
  subjectId: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    subjectId: getSubjectId(state)
  };
}

export default connect(mapStateToProps, { createSubjectData })(
  NewSubjectDataPage
);