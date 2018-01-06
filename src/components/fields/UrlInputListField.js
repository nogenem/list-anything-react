import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import ListValues from "./ListValues";
import EditableListInput from "./EditableListInput";

const styles = {
  showFieldDescription: {
    marginTop: "0px",
    maxHeight: "100px",
    overflowY: "auto"
  },
  default: { maxHeight: "100px", overflowY: "auto" }
};

class UrlInputListField extends React.Component {
  constructor(props) {
    super(props);
    this.values = props.value ? props.value.split("\n") : [];
  }

  shouldComponentUpdate = nextProps =>
    this.props.editable !== nextProps.editable ||
    this.props.showFieldDescription !== nextProps.showFieldDescription ||
    this.props.error !== nextProps.error;

  onChange = e => {
    this.values = e.target.values;
    this.props.onChange(e);
  };

  render() {
    const { editable, showFieldDescription, error, field } = this.props;
    const { values } = this;

    if (editable)
      return (
        <EditableListInput
          values={values}
          type="url"
          error={error}
          field={field}
          onChange={this.onChange}
        />
      );
    if (showFieldDescription)
      return (
        <Form.Field>
          <b>{field.description}:</b>
          <ListValues values={values} style={styles.showFieldDescription} />
        </Form.Field>
      );
    return <ListValues values={values} style={styles.default} />;
  }
}

UrlInputListField.propTypes = {
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

UrlInputListField.defaultProps = {
  // ownProps
  editable: false,
  showFieldDescription: true,
  error: "",
  field: {},
  onChange: () => {}
};

export default UrlInputListField;
