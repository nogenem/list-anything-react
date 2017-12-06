import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import InlineError from "../messages/InlineError";

const UrlInputField = ({ value, editable, error, field, onChange }) => {
  if (editable)
    return (
      <Form.Field error={!!error}>
        <Form.Input
          fluid
          type="url"
          label={field.description}
          value={value}
          onChange={onChange}
          name={field._id}
          placeholder="http://site.com/"
        />
        {error && <InlineError text={error} />}
      </Form.Field>
    );
  return (
    <a href={value} target="_blank">
      {value}
    </a>
  );
};

UrlInputField.propTypes = {
  value: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  error: PropTypes.string,
  field: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.string
  }),
  onChange: PropTypes.func
};

UrlInputField.defaultProps = {
  editable: false,
  error: "",
  field: {},
  onChange: () => {}
};

export default UrlInputField;
