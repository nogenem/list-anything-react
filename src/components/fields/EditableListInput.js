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

    const { values } = props;

    this.state = {
      inputValue: "",
      values
    };
  }

  onAddValue = e => {
    e.preventDefault();
    let { inputValue: value } = this.state;

    if (!value) return;
    if (this.props.type === "url" && !value.startsWith("http"))
      value = `http://${value}`;

    const values = [...this.state.values, value];
    this.props.onChange({
      target: { name: this.props.field._id, value: values.join("\n"), values }
    });
    this.setState({ inputValue: "", values });
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

  onChange = e => this.setState({ inputValue: e.target.value });

  focusOnInput = () => {
    const $input = document.querySelector(
      `input[name="${this.props.field._id}"]`
    );
    if ($input) $input.focus();
  };

  render() {
    const { error, field, type } = this.props;
    const { inputValue, values } = this.state;

    return (
      <div>
        <Form.Group widths={2}>
          <Form.Input
            width={13}
            fluid
            type={type}
            placeholder={field.description}
            name={field._id}
            value={inputValue}
            onChange={this.onChange}
            error={!!error}
          />
          <Form.Button
            color="teal"
            width={3}
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
      </div>
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
