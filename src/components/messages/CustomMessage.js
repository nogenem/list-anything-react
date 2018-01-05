import React from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";

const COLORS = [
  "red",
  "orange",
  "yellow",
  "olive",
  "green",
  "teal",
  "blue",
  "violet",
  "purple",
  "pink",
  "brown",
  "grey",
  "black",
  "none"
];

const TYPES_OBJ = {
  positive: { positive: true },
  success: { success: true },
  negative: { negative: true },
  error: { error: true },
  info: { info: true },
  warning: { warning: true },
  none: {}
};

const TYPES = Object.keys(TYPES_OBJ);

const CustomMessage = ({ header, content, color, type }) => {
  const userColor = color !== "none" ? { color } : {};
  return (
    <Message
      {...userColor}
      {...TYPES_OBJ[type]}
      style={{ textAlign: "center" }}
    >
      {!!header && <Message.Header>{header}</Message.Header>}
      {!!content && <Message.Content>{content}</Message.Content>}
    </Message>
  );
};

CustomMessage.propTypes = {
  // ownProps
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  color: PropTypes.oneOf(COLORS),
  type: PropTypes.oneOf(TYPES)
};

CustomMessage.defaultProps = {
  header: "",
  content: "",
  color: "none",
  type: "none"
};

export default CustomMessage;
