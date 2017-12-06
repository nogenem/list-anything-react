import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import InlineError from "../messages/InlineError";

const NumberInputField = ({ value, editable, error, field, onChange }) => {
  if (editable)
    return (
      <Form.Field error={!!error}>
        <Form.Input
          fluid
          type="number"
          label={field.description}
          value={Number(value)}
          onChange={onChange}
          name={field._id}
          placeholder={field.description}
        />
        {error && <InlineError text={error} />}
      </Form.Field>
    );
  return Number(value);
};

NumberInputField.propTypes = {
  value: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  error: PropTypes.string,
  field: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.string
  }),
  onChange: PropTypes.func
};

NumberInputField.defaultProps = {
  editable: false,
  error: "",
  field: {},
  onChange: () => {}
};

export default NumberInputField;
