import React from "react";
import { Message } from "semantic-ui-react";

const ConfirmEmailMessage = () => (
  <Message info style={{ textAlign: "center" }}>
    <Message.Header>
      Please, verify your email to unlock awesomeness
    </Message.Header>
  </Message>
);

export default ConfirmEmailMessage;
