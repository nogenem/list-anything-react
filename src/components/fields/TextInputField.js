import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import InlineError from "../messages/InlineError";

const TextInputField = ({ editable, error, onChange, field, value }) => (
  <Form.Field error={!!error}>
    <Form.Input
      fluid
      type="text"
      label={field.description}
      value={value}
      onChange={onChange}
      name={field._id}
      placeholder={field.description}
      disabled={!editable}
    />
    {error && <InlineError text={error} />}
  </Form.Field>
);

TextInputField.propTypes = {
  editable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  field: PropTypes.shape({
    field_type: PropTypes.string.isRequired
  }).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TextInputField;
