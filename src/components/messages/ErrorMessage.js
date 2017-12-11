import React from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";

const ErrorMessage = ({ text, showHeader }) => (
  <Message negative style={{ textAlign: "center" }}>
    {showHeader && <Message.Header>Something went wrong</Message.Header>}
    <p>{text}</p>
  </Message>
);

ErrorMessage.propTypes = {
  // ownProps
  text: PropTypes.string.isRequired,
  showHeader: PropTypes.bool
};

ErrorMessage.defaultProps = {
  showHeader: true
};

export default ErrorMessage;
