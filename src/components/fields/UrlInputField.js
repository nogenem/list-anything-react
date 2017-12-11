import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import InlineError from "../messages/InlineError";

const UrlInputField = ({
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
  if (showFieldDescription)
    return (
      <Form.Field>
        <b>{field.description}:</b>{" "}
        <a href={value} target="_blank">
          {value}
        </a>
      </Form.Field>
    );
  return (
    <a href={value} target="_blank">
      {value}
    </a>
  );
};

UrlInputField.propTypes = {
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

UrlInputField.defaultProps = {
  editable: false,
  showFieldDescription: true,
  error: "",
  field: {},
  onChange: () => {}
};

export default UrlInputField;
