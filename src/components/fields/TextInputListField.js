import React from "react";
import PropTypes from "prop-types";
import { Form, List } from "semantic-ui-react";

import InlineError from "../messages/InlineError";

class TextInputListField extends React.Component {
  constructor(props) {
    super(props);

    const { value } = props;

    this.state = {
      inputValue: "",
      values: value ? value.split("\n") : []
    };
  }

  onAddValue = e => {
    e.preventDefault();
    const { inputValue } = this.state;

    if (!inputValue) return;

    const values = [...this.state.values, inputValue];
    this.props.onChange({
      target: { name: this.props.field._id, value: values.join("\n") }
    });
    this.setState({ inputValue: "", values });
  };

  onRemoveValue = index => {
    const values = [...this.state.values];
    values.splice(index, 1);

    this.props.onChange({
      target: { name: this.props.field._id, value: values.join("\n") }
    });
    this.setState({ values });
  };

  onChange = e => this.setState({ inputValue: e.target.value });

  render() {
    const { editable, showFieldDescription, error, field } = this.props;
    const { inputValue, values } = this.state;

    if (editable)
      return (
        <div>
          <Form.Group widths={2}>
            <Form.Input
              width={13}
              fluid
              type="text"
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
          <List
            celled
            style={{
              marginBottom: "14px",
              maxHeight: "100px",
              overflowY: "auto"
            }}
          >
            {values.map((value, idx) => (
              <List.Item key={idx}>
                <List.Content floated="right">
                  <List.Icon
                    link
                    name="remove"
                    onClick={() => this.onRemoveValue(idx)}
                  />
                </List.Content>
                <List.Content>{value}</List.Content>
              </List.Item>
            ))}
          </List>
        </div>
      );
    if (showFieldDescription)
      return (
        <Form.Field>
          <b>{field.description}:</b>
          <List
            celled
            style={{ marginTop: "0px", maxHeight: "100px", overflowY: "auto" }}
          >
            {values.map((value, idx) => (
              <List.Item key={idx}>{value}</List.Item>
            ))}
          </List>
        </Form.Field>
      );
    return (
      <List celled style={{ maxHeight: "100px", overflowY: "auto" }}>
        {values.map((value, idx) => <List.Item key={idx}>{value}</List.Item>)}
      </List>
    );
  }
}

TextInputListField.propTypes = {
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

TextInputListField.defaultProps = {
  // ownProps
  editable: false,
  showFieldDescription: true,
  error: "",
  field: {},
  onChange: () => {}
};

export default TextInputListField;
