import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getSubjectDataElem } from "../../reducers/subjectData";
import {
  fetchById,
  editSubjectData,
  deleteSubjectData
} from "../../actions/subjectData";
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
        .fetchById(this.props.match.params._id)
        .then(() => this.setState({ loading: false }));
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

    return (
      <CenterElemsContainer>
        <SubjectDataForm
          submit={this.submit}
          delete={this.delete}
          subjectData={subjectData}
          fields={fields}
        />
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
    _id: PropTypes.string
  }),
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired
    })
  ).isRequired,
  currentSubjectId: PropTypes.string.isRequired,
  // mapDispatchToProps
  fetchById: PropTypes.func.isRequired,
  editSubjectData: PropTypes.func.isRequired,
  deleteSubjectData: PropTypes.func.isRequired
};

SubjectDataPage.defaultProps = {
  subjectData: {
    _id: ""
  }
};

const mapStateToProps = (state, ownProps) => ({
  subjectData: getSubjectDataElem(state, ownProps.match.params._id),
  fields: getFieldsArray(state),
  currentSubjectId: getSubjectId(state)
});

export default connect(mapStateToProps, {
  fetchById,
  editSubjectData,
  deleteSubjectData
})(SubjectDataPage);
