import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import InlineError from "../messages/InlineError";

const onClick = e => {
  e.preventDefault();
  e.stopPropagation();
};

const TextareaField = ({
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
        <Form.TextArea
          autoHeight
          style={{ maxHeight: "200px", minHeight: "75px" }}
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
    <Form.Field readOnly>
      <Form.TextArea
        autoHeight
        style={{
          maxHeight: showFieldDescription ? "200px" : "150px",
          border: "none",
          minWidth: "100%",
          outline: "none"
        }}
        label={showFieldDescription && field.description}
        value={value}
        name={field._id}
        placeholder={field.description}
        onClick={onClick}
      />
    </Form.Field>
  );
};

TextareaField.propTypes = {
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

TextareaField.defaultProps = {
  editable: false,
  showFieldDescription: true,
  error: "",
  field: {},
  onChange: () => {}
};

export default TextareaField;
