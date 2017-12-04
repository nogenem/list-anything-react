import React from "react";
import PropTypes from "prop-types";
import { Form, Image } from "semantic-ui-react";

import InlineError from "../messages/InlineError";

const UrlInputImgField = ({ editable, error, onChange, field, value }) => {
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
          placeholder="http://site.com/image.png"
        />
        {error && <InlineError text={error} />}
      </Form.Field>
    );
  return <Image size="tiny" centered src={value} />;
};

UrlInputImgField.propTypes = {
  editable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  field: PropTypes.shape({
    field_type: PropTypes.string.isRequired
  }),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

UrlInputImgField.defaultProps = {
  field: {
    field_type: ""
  },
  onChange: () => {}
};

export default UrlInputImgField;
