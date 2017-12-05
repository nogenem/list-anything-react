import React from "react";
import { Message } from "semantic-ui-react";

const WelcomeMessage = () => (
  <Message info style={{ textAlign: "center" }}>
    <Message.Header>Welcome to ListAnything!</Message.Header>
  </Message>
);

export default WelcomeMessage;
