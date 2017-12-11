import React from "react";
import PropTypes from "prop-types";

import TopNavigation from "../navigation/TopNavigation";
import MainContainer from "./MainContainer";

class MainContentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,
      activeItem: props.location.pathname
    };
  }

  toggleMenu = (e, { to }) =>
    this.setState(prevState => ({
      menuVisible: !prevState.menuVisible,
      activeItem: to || prevState.activeItem
    }));

  hideMenu = (e, { to }) =>
    this.setState(prevState => ({
      menuVisible: false,
      activeItem: to || prevState.activeItem
    }));

  render() {
    const { children, showContent } = this.props;
    const { menuVisible, activeItem } = this.state;
    return (
      <div
        id="main-content-container"
        style={{ display: showContent ? "block" : "none" }}
      >
        {showContent && (
          <TopNavigation
            activeItem={activeItem}
            toggleMenu={this.toggleMenu}
            hideMenu={this.hideMenu}
          />
        )}
        <MainContainer
          menuVisible={menuVisible}
          activeItem={activeItem}
          hideMenu={this.hideMenu}
        >
          {children}
        </MainContainer>
      </div>
    );
  }
}

MainContentContainer.propTypes = {
  // ownProps
  showContent: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default MainContentContainer;
