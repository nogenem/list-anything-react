import React from "react";
import PropTypes from "prop-types";
import { Menu, Sidebar, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getSubjectsArray } from "../../reducers/subjects";

const MainContainer = ({
  menuVisible,
  activeItem,
  hideMenu,
  style,
  children,
  subjects
}) => (
  <Sidebar.Pushable
    id="main-container"
    as={Segment}
    attached="bottom"
    style={{ height: "92.3%", ...style }}
  >
    <Sidebar
      width="thin"
      as={Menu}
      animation="uncover"
      icon="labeled"
      visible={menuVisible}
      vertical
      inverted
    >
      {subjects.map(subject => (
        <Menu.Item
          as={Link}
          to={`/subject/${subject._id}`}
          active={activeItem === `/subject/${subject._id}`}
          key={subject._id}
          onClick={hideMenu}
        >
          {subject.description}
        </Menu.Item>
      ))}
    </Sidebar>
    <Sidebar.Pusher dimmed={menuVisible} style={{ overflowY: "auto" }}>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

MainContainer.propTypes = {
  menuVisible: PropTypes.bool.isRequired,
  activeItem: PropTypes.string,
  hideMenu: PropTypes.func.isRequired,
  style: PropTypes.shape({
    display: PropTypes.string
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      description: PropTypes.string
    })
  ).isRequired
};

MainContainer.defaultProps = {
  activeItem: "",
  style: {},
  subjects: []
};

const mapStateToProps = state => ({
  subjects: getSubjectsArray(state)
});

export default connect(mapStateToProps)(MainContainer);
