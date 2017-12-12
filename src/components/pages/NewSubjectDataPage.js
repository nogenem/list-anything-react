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
      .createSubjectData({ subjectId: this.props.subjectId, ...data })
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
  // ownProps
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  // mapStateToProps
  subjectId: PropTypes.string.isRequired,
  // mapDispatchToProps
  createSubjectData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  subjectId: getSubjectId(state)
});

export default connect(mapStateToProps, { createSubjectData })(
  NewSubjectDataPage
);
