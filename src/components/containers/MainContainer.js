import React from "react";
import PropTypes from "prop-types";
import { Menu, Sidebar, Segment } from "semantic-ui-react";

const subjects = [
  { _id: "12345", subject: "Jogos" },
  { _id: "12346", subject: "Filmes" },
  { _id: "12347", subject: "Series" }
]; // Exemplo

const MainContainer = ({ menuVisible, children }) => (
  <Sidebar.Pushable
    className="main-container"
    as={Segment}
    attached="bottom"
    style={{ height: "92.3%" }}
  >
    <style>{`
      body > div,
      body > div > div {
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
        <Menu.Item key={data._id}>{data.subject}</Menu.Item>
      ))}
    </Sidebar>
    <Sidebar.Pusher dimmed={menuVisible}>{children}</Sidebar.Pusher>
  </Sidebar.Pushable>
);

MainContainer.propTypes = {
  menuVisible: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default MainContainer;
