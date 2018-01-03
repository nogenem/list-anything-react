import React from "react";
import PropTypes from "prop-types";
import { Menu, Sidebar, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getSubjectsArray } from "../../reducers/subjects";
import SearchInput from "../forms/SearchInput";

const MainContainer = ({
  menuVisible,
  hideMenu,
  search,
  children,
  activeItem,
  subjects
}) => (
  <Sidebar.Pushable id="main-container" as={Segment} attached="bottom">
    <Sidebar
      width="thin"
      as={Menu}
      animation="uncover"
      icon="labeled"
      visible={menuVisible}
      vertical
      inverted
    >
      <Menu.Item className="hide-gt-767px">
        <SearchInput onSearch={search} />
      </Menu.Item>
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
  // ownProps
  menuVisible: PropTypes.bool.isRequired,
  hideMenu: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  activeItem: PropTypes.string,
  // mapStateToProps
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      description: PropTypes.string
    })
  ).isRequired
};

MainContainer.defaultProps = {
  activeItem: "",
  subjects: []
};

const mapStateToProps = state => ({
  subjects: getSubjectsArray(state)
});

export const UnconnectedMainContainer = MainContainer;
export default connect(mapStateToProps)(MainContainer);
