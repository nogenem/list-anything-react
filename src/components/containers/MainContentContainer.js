import React from "react";
import PropTypes from "prop-types";

import TopNavigation from "../navigation/TopNavigation";
import MainContainer from "./MainContainer";

class MainContentContainer extends React.Component {
  state = {
    menuVisible: false
  };

  toggleMenu = () =>
    this.setState(prevState => ({ menuVisible: !prevState.menuVisible }));

  hideMenu = () => this.setState({ menuVisible: false });

  render() {
    const { children, showContent } = this.props;
    const { menuVisible } = this.state;
    return (
      <div
        id="main-content-container"
        style={{ display: showContent ? "block" : "none" }}
      >
        {showContent && (
          <TopNavigation
            toggleMenu={this.toggleMenu}
            hideMenu={this.hideMenu}
          />
        )}
        <MainContainer menuVisible={menuVisible} hideMenu={this.hideMenu}>
          {children}
        </MainContainer>
      </div>
    );
  }
}

MainContentContainer.propTypes = {
  showContent: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default MainContentContainer;
