import React from "react";
import PropTypes from "prop-types";
import { Form, Container } from "semantic-ui-react";

import InlineError from "../messages/InlineError";

const TextareaField = ({ value, editable, error, field, onChange }) => {
  if (editable)
    return (
      <Form.Field error={!!error}>
        <Form.TextArea
          autoHeight
          label={field.description}
          value={value}
          onChange={onChange}
          name={field._id}
          placeholder={field.description}
        />
        {error && <InlineError text={error} />}
      </Form.Field>
    );
  return (
    <Container text fluid textAlign="left">
      <p>{value}</p>
    </Container>
  );
};

TextareaField.propTypes = {
  value: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  error: PropTypes.string,
  field: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.string
  }),
  onChange: PropTypes.func
};

TextareaField.defaultProps = {
  editable: false,
  error: "",
  field: {},
  onChange: () => {}
};

export default TextareaField;
