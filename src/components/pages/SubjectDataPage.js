import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Loader } from "semantic-ui-react";
import { getSubjectDataElem } from "../../reducers/subjectData";
import {
  fetchSDById,
  editSubjectData,
  deleteSubjectData
} from "../../actions/subjectData";
import { fetchSubjectByTabId } from "../../actions/subjects";
import CenterElemsContainer from "../containers/CenterElemsContainer";
import { getFieldsArray, getSubjectId } from "../../reducers/currentSubject";
import SubjectDataForm from "../forms/SubjectDataForm";

class SubjectDataPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.subjectData._id === ""
    };
  }

  componentDidMount = () => {
    if (this.props.subjectData._id === "")
      this.props
        .fetchSDById(this.props.match.params._id)
        .then(() =>
          this.props
            .fetchSubjectByTabId(this.props.subjectData.tabId)
            .then(() => this.setState({ loading: false }))
        );
  };

  submit = data =>
    this.props.editSubjectData(this.props.match.params._id, data);

  delete = () =>
    this.props
      .deleteSubjectData(this.props.match.params._id)
      .then(() =>
        this.props.history.push(`/subject/${this.props.currentSubjectId}`)
      );

  render() {
    const { subjectData, fields } = this.props;
    const { loading } = this.state;

    return (
      <CenterElemsContainer>
        {loading && <Loader active inline="centered" />}
        {!loading && (
          <SubjectDataForm
            submit={this.submit}
            delete={this.delete}
            subjectData={subjectData}
            fields={fields}
          />
        )}
      </CenterElemsContainer>
    );
  }
}

SubjectDataPage.propTypes = {
  // ownProps
  match: PropTypes.shape({
    params: PropTypes.shape({
      _id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  // mapStateToProps
  subjectData: PropTypes.shape({
    _id: PropTypes.string,
    tabId: PropTypes.string
  }),
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired
    })
  ).isRequired,
  currentSubjectId: PropTypes.string.isRequired,
  // mapDispatchToProps
  fetchSDById: PropTypes.func.isRequired,
  fetchSubjectByTabId: PropTypes.func.isRequired,
  editSubjectData: PropTypes.func.isRequired,
  deleteSubjectData: PropTypes.func.isRequired
};

SubjectDataPage.defaultProps = {
  subjectData: {
    _id: "",
    tabId: ""
  }
};

const mapStateToProps = (state, ownProps) => ({
  subjectData: getSubjectDataElem(state, ownProps.match.params._id),
  fields: getFieldsArray(state),
  currentSubjectId: getSubjectId(state)
});

export default connect(mapStateToProps, {
  fetchSDById,
  fetchSubjectByTabId,
  editSubjectData,
  deleteSubjectData
})(SubjectDataPage);
