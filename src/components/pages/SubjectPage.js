import React, { Component } from "react";
import { Header, Segment, Table } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchSubject, fetchSubjectData } from "../../actions/subjects";

class SubjectPage extends Component {
  state = {
    loadingSubject: false,
    loadingData: false
  };

  componentDidMount = () => {
    this.setState({ loadingSubject: true });
    this.props.fetchSubject(this.props.match.params._id).then(() => {
      this.setState({ loadingSubject: false, loadingData: true });
      this.props
        .fetchSubjectData(null)
        .then(() => this.setState({ loadingData: false }));
    });
  };

  render() {
    const { loadingData, loadingSubject } = this.state;
    const { subject } = this.props;
    const fields = subject.fields
      ? subject.fields.filter(field => field.show_in_list)
      : [];
    return (
      <Segment
        style={{ maxWidth: "90%", margin: "10px auto" }}
        loading={loadingSubject}
      >
        <Header as="h2" color="teal" textAlign="center">
          Show Subject
        </Header>
        {!loadingSubject && (
          <Table celled compact>
            <Table.Header>
              <Table.Row>
                {fields.map(field => (
                  <Table.HeaderCell key={field._id}>
                    {field.description}
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{/* Repensar isso... */}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        )}
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
  fetchSubjectData: PropTypes.func.isRequired,
  subject: PropTypes.shape({
    description: PropTypes.string
  }).isRequired
};

function mapStateToProps(state) {
  return {
    subject: state.subject
  };
}

export default connect(mapStateToProps, { fetchSubject, fetchSubjectData })(
  SubjectPage
);
