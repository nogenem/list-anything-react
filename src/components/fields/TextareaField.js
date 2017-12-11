import React from "react";
import PropTypes from "prop-types";
import { Form, Container } from "semantic-ui-react";

import InlineError from "../messages/InlineError";

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
          label={field.description}
          value={value}
          onChange={onChange}
          name={field._id}
          placeholder={field.description}
        />
        {error && <InlineError text={error} />}
      </Form.Field>
    );
  // TODO testar isso, talvez não seja uma boa utilizar Container...
  return (
    <Container text fluid textAlign="left">
      {showFieldDescription && <b>{field.description}:</b>}
      <p>{value}</p>
    </Container>
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
