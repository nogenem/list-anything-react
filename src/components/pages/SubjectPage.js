import React, { Component } from "react";
import { Header, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchSubject, fetchSubjectData } from "../../actions/subjects";

class SubjectPage extends Component {
  componentDidMount = () => {
    this.props
      .fetchSubject(this.props.match.params._id)
      .then(() => this.props.fetchSubjectData(null));
  };

  render() {
    return (
      <Segment style={{ maxWidth: 500, margin: "10px auto" }}>
        <Header as="h2" color="teal" textAlign="center">
          Show Subject
        </Header>
      </Segment>
    );
  }
}

SubjectPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      _id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  fetchSubject: PropTypes.func.isRequired,
  fetchSubjectData: PropTypes.func.isRequired
};

export default connect(null, { fetchSubject, fetchSubjectData })(SubjectPage);
