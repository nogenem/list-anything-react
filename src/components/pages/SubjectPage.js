import React, { Component } from "react";
import { Segment, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import SubjectDataContainer from "../containers/SubjectDataContainer";
import { fetchSubjectById, deleteSubject } from "../../actions/subjects";
import { fetchSDByTabId } from "../../actions/subjectData";
import { getFieldsArray, getTabsArray } from "../../reducers/currentSubject";
import { getSubjectDataArray } from "../../reducers/subjectData";
import SubjectDataTable from "../tables/SubjectDataTable";
import EditDeleteBtnGroup from "../containers/EditDeleteBtnGroup";
import handleServerErrors from "../../utils/handleServerErrors";
import ErrorMessage from "../messages/ErrorMessage";

class SubjectPage extends Component {
  state = {
    loadingSubject: false,
    loadingData: false,
    menuVisible: false,
    currentTabId: "",
    activeTab: "",
    errors: {}
  };

  componentDidMount = () => this.loadSubjects(this.props);

  componentWillReceiveProps(nextProps) {
    const currentId = this.props.match.params._id;
    const nextId = nextProps.match.params._id;

    if (currentId !== nextId) {
      this.loadSubjects(nextProps);
    }

    if (
      nextProps.firstTab._id !== "" &&
      this.props.firstTab !== nextProps.firstTab
    ) {
      this.loadSubjectData(nextProps, nextProps.firstTab._id);
    }
  }

  onMenuClick = (e, { tabid }) => {
    this.setState({ menuVisible: false });
    this.loadSubjectData(this.props, tabid);
  };

  onTableRowClick = e => {
    // Workaround ja que o onClick em Table.Row retorna
    // a Table.Cell que foi clicada e não a Table.Row e
    // também porque não da pra por Table.Row como Link
    const to = e.currentTarget.getAttribute("to");
    this.props.history.push(to);
  };

  loadSubjects = props => {
    this.setState({ loadingSubject: true });
    props
      .fetchSubjectById(props.match.params._id)
      .then(() => this.setState({ loadingSubject: false, errors: {} }))
      .catch(err =>
        this.setState({
          loadingSubject: false,
          errors: handleServerErrors(err)
        })
      );
  };

  loadSubjectData = (props, tabId) => {
    this.setState({ loadingData: true, activeTab: tabId });
    props
      .fetchSDByTabId(tabId)
      .then(() => this.setState({ loadingData: false, currentTabId: tabId }));
  };

  toggleMenu = () =>
    this.setState(prevState => ({ menuVisible: !prevState.menuVisible }));

  deleteSubject = () =>
    this.props
      .deleteSubject(this.props.match.params._id)
      .then(() => this.props.history.push("/dashboard"));

  render() {
    const {
      loadingData,
      loadingSubject,
      menuVisible,
      currentTabId,
      activeTab,
      errors
    } = this.state;
    const { fields } = this.props;
    const sdId = this.props.match.params._id;

    let { subjectDataArray } = this.props;
    if (subjectDataArray.length > 0 && currentTabId !== "") {
      subjectDataArray = subjectDataArray.filter(d => d.tabId === currentTabId);
    }

    return (
      <Segment
        style={{ maxWidth: "90%", margin: "10px auto", height: "90%" }}
        loading={loadingSubject}
        basic
      >
        {errors.global && <ErrorMessage text={errors.global} />}
        {!errors.global && (
          <div
            style={{
              marginBottom: "3px",
              display: "inline-flex",
              width: "100%",
              justifyContent: "space-between"
            }}
          >
            <Button.Group size="medium" icon>
              <Button onClick={this.toggleMenu} icon="sidebar" />
              <Button
                as={Link}
                to={`/subject/${sdId}/add`}
                icon="plus"
                color="green"
              />
            </Button.Group>
            <EditDeleteBtnGroup
              showEdit={false}
              onDelete={this.deleteSubject}
            />
          </div>
        )}
        {!errors.global &&
          !loadingSubject && (
            <SubjectDataContainer
              menuVisible={menuVisible}
              onMenuClick={this.onMenuClick}
              activeTab={activeTab}
            >
              <SubjectDataTable
                fields={fields}
                subjectDataArray={subjectDataArray}
                loading={loadingData}
                onTableRowClick={this.onTableRowClick}
              />
            </SubjectDataContainer>
          )}
      </Segment>
    );
  }
}

SubjectPage.propTypes = {
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
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired
    })
  ).isRequired,
  subjectDataArray: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired
    })
  ).isRequired,
  firstTab: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }),
  // mapDispatchToProps
  fetchSubjectById: PropTypes.func.isRequired,
  fetchSDByTabId: PropTypes.func.isRequired,
  deleteSubject: PropTypes.func.isRequired
};

SubjectPage.defaultProps = {
  firstTab: {
    _id: ""
  }
};

const mapStateToProps = state => ({
  fields: getFieldsArray(state),
  subjectDataArray: getSubjectDataArray(state),
  firstTab: getTabsArray(state)[0]
});

export const UnconnectedSubjectPage = SubjectPage;
export default connect(mapStateToProps, {
  fetchSubjectById,
  fetchSDByTabId,
  deleteSubject
})(SubjectPage);
