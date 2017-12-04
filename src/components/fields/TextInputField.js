import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import InlineError from "../messages/InlineError";

const TextInputField = ({ editable, error, onChange, field, value }) => {
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
  return value;
};

TextInputField.propTypes = {
  editable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  field: PropTypes.shape({
    field_type: PropTypes.string.isRequired
  }),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

TextInputField.defaultProps = {
  field: {
    field_type: ""
  },
  onChange: () => {}
};

export default TextInputField;
