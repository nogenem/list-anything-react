import React from "react";
import PropTypes from "prop-types";
import { Form, Image } from "semantic-ui-react";

import InlineError from "../messages/InlineError";

const UrlInputImgField = ({ editable, error, onChange, field, value }) => (
  <Form.Field error={!!error}>
    {editable && (
      <Form.Input
        fluid
        type="url"
        label={field.description}
        value={value}
        onChange={onChange}
        name={field._id}
        placeholder="http://site.com/image.png"
      />
    )}
    {!editable && <Image str={value} />}
    {error && <InlineError text={error} />}
  </Form.Field>
);

UrlInputImgField.propTypes = {
  editable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  field: PropTypes.shape({
    field_type: PropTypes.string.isRequired
  }).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default UrlInputImgField;
