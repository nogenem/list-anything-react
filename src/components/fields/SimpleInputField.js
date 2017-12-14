import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import InlineError from "../messages/InlineError";

const SimpleInputField = ({
  value,
  type,
  editable,
  showFieldDescription,
  error,
  field,
  onChange
}) => {
  if (editable)
    return (
      <Form.Field error={!!error}>
        <Form.Input
          fluid
          type={type}
          label={field.description}
          value={value}
          onChange={onChange}
          name={field._id}
          placeholder={field.description}
        />
        {error && <InlineError text={error} />}
      </Form.Field>
    );
  if (showFieldDescription)
    return (
      <Form.Field>
        <b>{field.description}:</b> {value}
      </Form.Field>
    );
  return value;
};

SimpleInputField.propTypes = {
  // ownProps
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  editable: PropTypes.bool,
  showFieldDescription: PropTypes.bool,
  error: PropTypes.string,
  field: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.string
  }),
  onChange: PropTypes.func
};

SimpleInputField.defaultProps = {
  type: "text",
  editable: false,
  showFieldDescription: true,
  error: "",
  field: {},
  onChange: () => {}
};

export default SimpleInputField;
