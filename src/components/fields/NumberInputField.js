import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import InlineError from "../messages/InlineError";

const NumberInputField = ({
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
  if (showFieldDescription)
    return (
      <Form.Field>
        <b>{field.description}:</b> {Number(value)}
      </Form.Field>
    );
  return Number(value);
};

NumberInputField.propTypes = {
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

NumberInputField.defaultProps = {
  editable: false,
  showFieldDescription: true,
  error: "",
  field: {},
  onChange: () => {}
};

export default NumberInputField;
