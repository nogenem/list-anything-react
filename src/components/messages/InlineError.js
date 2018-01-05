import React from "react";
import PropTypes from "prop-types";

const style = {
  color: "#ae5856",
  textAlign: "left",
  minWidth: "100%"
};

const InlineError = ({ text }) => <div style={style}>{text}</div>;

InlineError.propTypes = {
  // ownProps
  text: PropTypes.string.isRequired
};

export default InlineError;
