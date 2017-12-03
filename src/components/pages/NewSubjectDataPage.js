import React, { Component } from "react";
import { Header, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import NewSubjectDataForm from "../forms/NewSubjectDataForm";
import { createSubjectData } from "../../actions/subjects";

class NewSubjectDataPage extends Component {
  submit = data =>
    this.props
      .createSubjectData(data)
      .then(() =>
        this.props.history.push(`/subject/${this.props.subject._id}`)
      );

  render() {
    const { subject } = this.props;
    if (!subject.description) return <div />;
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
  subject: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.string
  }).isRequired
};

function mapStateToProps(state) {
  return {
    subject: state.subject
  };
}

export default connect(mapStateToProps, { createSubjectData })(
  NewSubjectDataPage
);
