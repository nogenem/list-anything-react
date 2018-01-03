import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown, Image, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import isEmpty from "lodash.isempty";

import gravatarUrl from "../../utils/gravatar-url";
import * as actions from "../../actions/auth";
import { getSubjectsArray } from "../../reducers/subjects";
import { getEmail } from "../../reducers/user";
import SearchInput from "../forms/SearchInput";

class TopNavigation extends React.Component {
  trigger = email => (
    <span>
      <Image avatar src={gravatarUrl(email, { size: 30 })} />
    </span>
  );

  render() {
    const {
      toggleMenu,
      hideMenu,
      search,
      activeItem,
      email,
      hasSubjects,
      logout
    } = this.props;

    return (
      <Menu size="small" attached="top" id="top-navigation" inverted>
        <Menu.Item onClick={toggleMenu}>
          <Icon name="sidebar" className="menu-icon-responsive" />
          <span className="hide-lt-767px">Menu</span>
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/dashboard"
          active={activeItem === "/dashboard"}
          onClick={hideMenu}
        >
          <Icon name="home" className="menu-icon-responsive" />
          <span className="hide-lt-767px">Dashboard</span>
        </Menu.Item>
        {hasSubjects && (
          <Menu.Item
            as={Link}
            to="/subjects/new"
            active={activeItem === "/subjects/new"}
            onClick={hideMenu}
          >
            <Icon name="plus" className="menu-icon-responsive" />
            <span className="hide-lt-767px">Add new Subject</span>
          </Menu.Item>
        )}

        <Menu.Menu position="right">
          <Menu.Item className="hide-lt-767px">
            <SearchInput onSearch={search} />
          </Menu.Item>
          <Dropdown item trigger={this.trigger(email)}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}

TopNavigation.propTypes = {
  // ownProps
  toggleMenu: PropTypes.func.isRequired,
  hideMenu: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
  // mapStateToProps
  email: PropTypes.string.isRequired,
  hasSubjects: PropTypes.bool.isRequired,
  // mapDispatchToProps
  logout: PropTypes.func.isRequired
};

TopNavigation.defaultProps = {
  activeItem: ""
};

const mapStateToProps = state => ({
  email: getEmail(state),
  hasSubjects: !isEmpty(getSubjectsArray(state))
});

export const UnconnectedTopNavigation = TopNavigation;
export default connect(mapStateToProps, {
  logout: actions.logout
})(TopNavigation);
