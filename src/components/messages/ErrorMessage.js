import React from "react";
import PropTypes from "prop-types";

import CustomMessage from "./CustomMessage";

const ErrorMessage = ({ text, showHeader }) => (
  <CustomMessage
    header={showHeader ? "Something went wrong" : null}
    content={text}
    type={"error"}
  />
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
