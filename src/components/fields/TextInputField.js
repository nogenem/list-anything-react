import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import InlineError from "../messages/InlineError";

const TextInputField = ({
  value,
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
          type="text"
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

TextInputField.propTypes = {
  // ownProps
  value: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  showFieldDescription: PropTypes.bool,
  error: PropTypes.string,
  field: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.string
  }),
  onChange: PropTypes.func
};

TextInputField.defaultProps = {
  editable: false,
  showFieldDescription: true,
  error: "",
  field: {},
  onChange: () => {}
};

export default TextInputField;
