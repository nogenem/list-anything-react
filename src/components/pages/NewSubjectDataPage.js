import React, { Component } from "react";
import { Header, Segment, Loader } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import NewSubjectDataForm from "../forms/NewSubjectDataForm";
import { createSubjectData } from "../../actions/subjectData";
import { getSubjectId } from "../../reducers/currentSubject";
import { fetchSubjectById } from "../../actions/subjects";

class NewSubjectDataPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: props.subjectId === ""
    };
  }

  componentDidMount = () => {
    if (this.props.subjectId === "")
      this.props
        .fetchSubjectById(this.props.match.params._id)
        .then(() => this.setState({ loading: false }));
  };

  submit = data =>
    this.props
      .createSubjectData({ subjectId: this.props.subjectId, ...data })
      .then(() => this.props.history.push(`/subject/${this.props.subjectId}`));

  render() {
    const { loading } = this.state;
    return (
      <Segment style={{ maxWidth: 500, margin: "10px auto" }}>
        <Header as="h2" color="teal" textAlign="center">
          Add new Subject Data
        </Header>
        {loading && <Loader active inline="centered" />}
        {!loading && <NewSubjectDataForm submit={this.submit} />}
      </Segment>
    );
  }
}

NewSubjectDataPage.propTypes = {
  // ownProps
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      _id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  // mapStateToProps
  subjectId: PropTypes.string.isRequired,
  // mapDispatchToProps
  createSubjectData: PropTypes.func.isRequired,
  fetchSubjectById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  subjectId: getSubjectId(state)
});

export default connect(mapStateToProps, {
  createSubjectData,
  fetchSubjectById
})(NewSubjectDataPage);
