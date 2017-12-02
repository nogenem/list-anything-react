import React from "react";
import PropTypes from "prop-types";
import { Menu, Sidebar, Segment } from "semantic-ui-react";
import { connect } from "react-redux";

import { allSubjectsSelector } from "../../reducers/subjects";

const MainContainer = ({ menuVisible, children, subjects, style }) => (
  <Sidebar.Pushable
    className="main-container"
    as={Segment}
    attached="bottom"
    style={{ height: "92.3%", ...style }}
  >
    <style>{`
      body > div,
      body > div > div,
      .main-container > div.pusher,
      .main-container > div.pusher > div.form-container {
          height: 100%;
      }
    `}</style>
    <Sidebar
      width="thin"
      as={Menu}
      animation="uncover"
      icon="labeled"
      visible={menuVisible}
      vertical
      inverted
    >
      {subjects.map(data => (
        <Menu.Item key={data._id}>{data.description}</Menu.Item>
      ))}
    </Sidebar>
    <Sidebar.Pusher dimmed={menuVisible} style={{ overflowY: "auto" }}>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

MainContainer.propTypes = {
  menuVisible: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  style: PropTypes.shape({
    display: PropTypes.string
  })
};

MainContainer.defaultProps = {
  style: {}
};

function mapStateToProps(state) {
  return {
    subjects: allSubjectsSelector(state)
  };
}

export default connect(mapStateToProps)(MainContainer);
