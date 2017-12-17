import React from "react";
import PropTypes from "prop-types";
import { Form, List } from "semantic-ui-react";

import InlineError from "../messages/InlineError";

class UrlInputListField extends React.Component {
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
    let { inputValue: value } = this.state;

    if (!value) return;
    if (!value.startsWith("http")) value = `http://${value}`;

    const values = [...this.state.values, value];
    this.props.onChange({
      target: { name: this.props.field._id, value: values.join("\n") }
    });
    this.setState({ inputValue: "", values });
    this.focusOnInput();
  };

  onRemoveValue = index => {
    const values = [...this.state.values];
    values.splice(index, 1);

    this.props.onChange({
      target: { name: this.props.field._id, value: values.join("\n") }
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
    const { editable, showFieldDescription, error, field } = this.props;
    const { inputValue, values } = this.state;

    if (editable)
      return (
        <div>
          <Form.Group widths={2}>
            <Form.Input
              width={13}
              fluid
              type="url"
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
                <List.Content>
                  <a href={value} target="_blank">
                    {value}
                  </a>
                </List.Content>
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
              <List.Item key={idx}>
                <a href={value} target="_blank">
                  {value}
                </a>
              </List.Item>
            ))}
          </List>
        </Form.Field>
      );
    return (
      <List celled style={{ maxHeight: "100px", overflowY: "auto" }}>
        {values.map((value, idx) => (
          <List.Item key={idx}>
            <a href={value} target="_blank">
              {value}
            </a>
          </List.Item>
        ))}
      </List>
    );
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
