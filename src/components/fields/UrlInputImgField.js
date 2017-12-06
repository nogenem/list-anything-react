import React from "react";
import PropTypes from "prop-types";
import { Form, Image } from "semantic-ui-react";

import InlineError from "../messages/InlineError";

const UrlInputImgField = ({ value, editable, error, field, onChange }) => {
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
  value: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  error: PropTypes.string,
  field: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.string
  }),
  onChange: PropTypes.func
};

UrlInputImgField.defaultProps = {
  editable: false,
  error: "",
  field: {},
  onChange: () => {}
};

export default UrlInputImgField;
