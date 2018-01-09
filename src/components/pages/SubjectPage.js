import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SubjectDataContainer from "../containers/SubjectDataContainer";
import { fetchSubjectById, deleteSubject } from "../../actions/subjects";
import { fetchSDByTabId } from "../../actions/subjectData";
import { getFieldsArray, getTabsArray } from "../../reducers/currentSubject";
import { getSubjectDataArray } from "../../reducers/subjectData";
import SubjectDataTable from "../tables/SubjectDataTable";
import handleServerErrors from "../../utils/handleServerErrors";
import ErrorMessage from "../messages/ErrorMessage";

import ActionBtnsContainer from "../containers/ActionBtnsContainer";

const styles = {
  btnContainer: {
    marginBottom: "3px",
    display: "inline-flex",
    width: "100%",
    justifyContent: "space-between"
  }
};

// TODO: Melhorar este componente, quebrando em subcomponentes por exemplo.
class SubjectPage extends Component {
  state = {
    subjectData: [],
    loadingSubject: false,
    loadingData: false,
    menuVisible: false,
    activeTab: "",
    errors: {}
  };

  componentDidMount = () => {
    this.loadSubjects(this.props);
  };

  componentWillReceiveProps(nextProps) {
    const currentId = this.props.match.params._id;
    const nextId = nextProps.match.params._id;

    if (currentId !== nextId) this.loadSubjects(nextProps);

    const currentArray = this.props.subjectDataArray;
    const nextArray = nextProps.subjectDataArray;

    if (currentArray !== nextArray)
      this.filterSubjectData(nextArray, this.state.activeTab);
  }

  onMenuClick = (e, { tabid }) => {
    this.setState({ menuVisible: false });
    if (tabid !== this.state.activeTab) this.loadSubjectData(this.props, tabid);
  };

  onTableRowClick = e => {
    // Workaround ja que o onClick em Table.Row retorna
    // a Table.Cell que foi clicada e não a Table.Row e
    // também porque não da pra por Table.Row como Link
    const to = e.currentTarget.getAttribute("to");
    this.props.history.push(to);
  };

  filterSubjectData = (data, tabId) => {
    const subjectData = data.filter(d => d.tabId === tabId);
    this.setState({ subjectData });
  };

  gotoAdd = () => {
    this.props.history.push(`/subject/${this.props.match.params._id}/add`);
  };

  loadSubjects = props => {
    this.setState({ loadingSubject: true });
    props
      .fetchSubjectById(props.match.params._id)
      .then(() => {
        this.loadSubjectData(this.props, this.props.firstTab._id);
        this.setState({ loadingSubject: false, errors: {} });
      })
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
      .then(() => this.setState({ loadingData: false }))
      .catch(err =>
        this.setState({
          loadingSubject: false,
          errors: handleServerErrors(err)
        })
      );
  };

  toggleMenu = () =>
    this.setState(prevState => ({ menuVisible: !prevState.menuVisible }));

  hideMenu = () => this.setState({ menuVisible: false });

  deleteSubject = () =>
    this.props
      .deleteSubject(this.props.match.params._id)
      .then(() => this.props.history.push("/dashboard"));

  render() {
    const {
      subjectData,
      loadingData,
      loadingSubject,
      menuVisible,
      activeTab,
      errors
    } = this.state;
    const { fields } = this.props;

    return (
      <Segment
        style={{ maxWidth: "90%", margin: "10px auto", height: "90%" }}
        loading={loadingSubject}
        basic
      >
        {errors.global && <ErrorMessage text={errors.global} />}
        {!errors.global && (
          <ActionBtnsContainer
            onMenu={this.toggleMenu}
            onAdd={this.gotoAdd}
            onDelete={this.deleteSubject}
            style={styles.btnContainer}
          />
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
                subjectDataArray={subjectData}
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
