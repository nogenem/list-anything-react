import React, { Component } from "react";
import { Header, Segment, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import SubjectDataContainer from "../containers/SubjectDataContainer";
import { fetchSubject } from "../../actions/subjects";
import { fetchSubjectData } from "../../actions/subjectData";
import {
  getSubjectDescription,
  getFieldsArray
} from "../../reducers/currentSubject";
import { getSubjectDataArray } from "../../reducers/subjectData";
import SubjectDataTable from "../tables/SubjectDataTable";

class SubjectPage extends Component {
  state = {
    loadingSubject: false,
    loadingData: false,
    menuVisible: false
  };

  componentDidMount = () => this.loadSubjects(this.props);

  componentWillReceiveProps(nextProps) {
    const currentId = this.props.match.params._id;
    const nextId = nextProps.match.params._id;
    if (currentId !== nextId) {
      this.loadSubjects(nextProps);
    }
  }

  onMenuClick = (e, { tabid }) => {
    this.setState({ menuVisible: false });
    this.loadSubjectData(this.props, tabid);
  };

  loadSubjects = props => {
    this.setState({ loadingSubject: true });
    props
      .fetchSubject(props.match.params._id)
      .then(() => this.loadSubjectData(props, null));
  };

  loadSubjectData = (props, _id) => {
    this.setState({ loadingSubject: false, loadingData: true });
    props
      .fetchSubjectData(_id)
      .then(() => this.setState({ loadingData: false }));
  };

  toggleMenu = () => this.setState({ menuVisible: !this.state.menuVisible });

  render() {
    const { loadingData, loadingSubject, menuVisible } = this.state;
    const { subjectDescription, fields, subjectData } = this.props;
    return (
      <Segment
        style={{ maxWidth: "90%", margin: "10px auto", height: "92.3%" }}
        loading={loadingSubject}
      >
        <Header as="h2" color="teal" textAlign="center">
          {subjectDescription} Data
        </Header>
        <Button icon="sidebar" onClick={this.toggleMenu} />
        <Button icon="add" positive primary as={Link} to="/subject-data/new" />
        {!loadingSubject && (
          <SubjectDataContainer
            menuVisible={menuVisible}
            onMenuClick={this.onMenuClick}
          >
            <SubjectDataTable
              fields={fields}
              subjectData={subjectData}
              loading={loadingData}
            />
          </SubjectDataContainer>
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
  subjectDescription: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired
    })
  ).isRequired,
  subjectData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired
    })
  ).isRequired
};

function mapStateToProps(state) {
  return {
    subjectDescription: getSubjectDescription(state),
    fields: getFieldsArray(state),
    subjectData: getSubjectDataArray(state)
  };
}

export default connect(mapStateToProps, { fetchSubject, fetchSubjectData })(
  SubjectPage
);
