import React, { Component } from "react";
import { Header, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import NewSubjectForm from "../forms/NewSubjectForm";
import { createSubject } from "../../actions/subjects";

class NewSubjectPage extends Component {
  submit = data =>
    this.props
      .createSubject(data)
      .then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <Segment style={{ maxWidth: 500, margin: "10px auto" }}>
        <Header as="h2" color="teal" textAlign="center">
          Create new Subject
        </Header>
        <NewSubjectForm submit={this.submit} />
      </Segment>
    );
  }
}

NewSubjectPage.propTypes = {
  // ownProps
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  // mapDispatchToProps
  createSubject: PropTypes.func.isRequired
};

export default connect(null, { createSubject })(NewSubjectPage);
