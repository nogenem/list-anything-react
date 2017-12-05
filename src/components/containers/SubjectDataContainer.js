import React from "react";
import PropTypes from "prop-types";
import { Menu, Sidebar, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { getTabsArray } from "../../reducers/currentSubject";

const SubjectDataContainer = ({ menuVisible, onMenuClick, children, tabs }) => (
  <Sidebar.Pushable
    className="subject-data-container"
    as={Segment}
    attached="bottom"
    style={{ height: "86%" }}
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
      {tabs.map(data => (
        <Menu.Item key={data._id} tabid={data._id} onClick={onMenuClick}>
          {data.description}
        </Menu.Item>
      ))}
    </Sidebar>
    <Sidebar.Pusher dimmed={menuVisible} style={{ overflowY: "auto" }}>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

SubjectDataContainer.propTypes = {
  menuVisible: PropTypes.bool.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      description: PropTypes.string
    })
  ).isRequired
};

function mapStateToProps(state) {
  return {
    tabs: getTabsArray(state)
  };
}

export default connect(mapStateToProps)(SubjectDataContainer);