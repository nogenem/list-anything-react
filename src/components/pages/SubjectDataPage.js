import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getSubjectDataElem } from "../../reducers/subjectData";
import { fetchById } from "../../actions/subjectData";
import CenterElemsContainer from "../containers/CenterElemsContainer";
import { getFieldsArray } from "../../reducers/currentSubject";
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

  submit = data => {
    console.log("data: ", data);
    return Promise.resolve();
  };

  render() {
    const { subjectData, fields } = this.props;

    return (
      <CenterElemsContainer>
        <SubjectDataForm
          submit={this.submit}
          subjectData={subjectData}
          fields={fields}
        />
      </CenterElemsContainer>
    );
  }
}

SubjectDataPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      _id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  fetchById: PropTypes.func.isRequired,
  subjectData: PropTypes.shape({
    _id: PropTypes.string
  }),
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired
    })
  ).isRequired
};

SubjectDataPage.defaultProps = {
  subjectData: {
    _id: ""
  }
};

function mapStateToProps(state, ownProps) {
  return {
    subjectData: getSubjectDataElem(state, ownProps.match.params._id),
    fields: getFieldsArray(state)
  };
}

export default connect(mapStateToProps, { fetchById })(SubjectDataPage);
