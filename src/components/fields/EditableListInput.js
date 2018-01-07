import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import ListValues from "./ListValues";
import InlineError from "../messages/InlineError";

const style = {
  marginBottom: "14px",
  maxHeight: "100px",
  overflowY: "auto"
};

class EditableListInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: props.values
    };
  }

  onAddValue = e => {
    e.preventDefault();

    const name = this.props.field._id;
    const $input = this.getInput();
    let value = $input.value;

    if (!value) return;
    if (this.props.type === "url" && !value.startsWith("http"))
      value = `http://${value}`;

    const values = [...this.state.values, value];
    this.props.onChange({
      target: { name, value: values.join("\n"), values }
    });
    this.setState({ values });

    $input.value = "";
    this.focusOnInput();
  };

  onRemoveValue = index => {
    const values = [...this.state.values];
    values.splice(index, 1);

    this.props.onChange({
      target: { name: this.props.field._id, value: values.join("\n"), values }
    });
    this.setState({ values });
    this.focusOnInput();
  };

  getInput = () =>
    document.querySelector(
      `.Editable-List-Input input[name="${this.props.field._id}"]`
    );

  focusOnInput = () => {
    const $input = this.getInput();
    if ($input) $input.focus();
  };

  render() {
    const { error, field, type } = this.props;
    const { values } = this.state;

    return (
      <Form.Field className="Editable-List-Input">
        <Form.Group widths={2} unstackable>
          <Form.Input
            fluid
            width={13}
            type={type}
            placeholder={field.description}
            name={field._id}
            error={!!error}
          />
          <Form.Button
            width={3}
            color="teal"
            onClick={this.onAddValue}
            content="Add"
          />
        </Form.Group>
        {error && <InlineError text={error} />}
        <ListValues
          values={values}
          onRemove={this.onRemoveValue}
          style={style}
        />
      </Form.Field>
    );
  }
}

EditableListInput.propTypes = {
  // ownProps
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  field: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.string
  }),
  onChange: PropTypes.func.isRequired
};

EditableListInput.defaultProps = {
  // ownProps
  error: "",
  field: {}
};

export default EditableListInput;
