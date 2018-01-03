import React from "react";
import PropTypes from "prop-types";
import { Menu, Sidebar, Segment } from "semantic-ui-react";
import { connect } from "react-redux";

import { getTabsArray } from "../../reducers/currentSubject";

const SubjectDataContainer = ({
  menuVisible,
  onMenuClick,
  children,
  activeTab,
  tabs
}) => (
  <Sidebar.Pushable
    className="subject-data-container"
    as={Segment}
    attached="bottom"
  >
    <Sidebar
      width="thin"
      as={Menu}
      animation="overlay"
      icon="labeled"
      visible={menuVisible}
      vertical
      inverted
    >
      {tabs.map(tab => (
        <Menu.Item
          key={tab._id}
          tabid={tab._id}
          active={activeTab === tab._id}
          onClick={onMenuClick}
        >
          {tab.description}
        </Menu.Item>
      ))}
    </Sidebar>
    <Sidebar.Pusher dimmed={menuVisible} style={{ overflowY: "auto" }}>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

SubjectDataContainer.propTypes = {
  // ownProps
  menuVisible: PropTypes.bool.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  activeTab: PropTypes.string,
  // mapStateToProps
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      description: PropTypes.string
    })
  ).isRequired
};

SubjectDataContainer.defaultProps = {
  activeTab: ""
};

const mapStateToProps = state => ({
  tabs: getTabsArray(state)
});

export const UnconnectedSubjectDataContainer = SubjectDataContainer;
export default connect(mapStateToProps)(SubjectDataContainer);
