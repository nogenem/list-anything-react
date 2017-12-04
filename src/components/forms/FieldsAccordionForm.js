import React, { Component } from "react";
import { Accordion, List, Icon, Form } from "semantic-ui-react";
import PropTypes from "prop-types";

import InlineError from "../messages/InlineError";

class FieldsAccordionForm extends Component {
  state = {
    data: {
      description: "",
      is_unique: false,
      show_in_list: false,
      field_type: ""
    },
    active: false,
    error: "",
    fieldTypes: [
      "text_input",
      "url_input_img",
      "textarea",
      "url_input",
      "texT_input_list"
    ] // TODO: jogar pro banco de dados
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onCheckboxChange = (e, elm) =>
    this.setState({
      data: { ...this.state.data, [elm.name]: elm.checked }
    });

  onAccordionClick = () =>
    this.setState(prevState => ({ active: !prevState.active }));

  onAddField = e => {
    e.preventDefault();
    const error = this.validate(this.state.data);
    this.setState({ error });
    if (error === "") {
      this.props.addField(this.state.data);
      this.setState({
        data: {
          description: "",
          is_unique: false,
          show_in_list: false,
          field_type: ""
        }
      });
    }
  };

  validate = data => {
    let error = "";
    const desc = data.description;
    if (!desc) error = "Can't be blank";
    else {
      const duplicated = this.props.fields.reduce(
        (acc, item) => acc || item.description === desc,
        false
      );
      if (duplicated) error = "Can't have duplicates";
    }
    return error;
  };

  render() {
    const { fields, removeField } = this.props;
    const { data, active, error, fieldTypes } = this.state;

    return (
      <Accordion as={Form.Field}>
        <Accordion.Title
          name="tabs"
          onClick={this.onAccordionClick}
          active={active}
        >
          <Icon name="dropdown" />
          Add Fields
        </Accordion.Title>
        <Accordion.Content active={active}>
          <Form.Field error={!!error}>
            <Form.Input
              fluid
              type="text"
              placeholder="field description"
              value={data.description}
              onChange={this.onChange}
              name="description"
            />
            {error && <InlineError text={error} />}
          </Form.Field>

          <Form.Field
            label="Select the field type:"
            control="select"
            name="field_type"
            value={data.field_type}
            onChange={this.onChange}
          >
            {fieldTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </Form.Field>

          <Form.Checkbox
            label="Is a unique field?"
            name="is_unique"
            checked={data.is_unique}
            onChange={this.onCheckboxChange}
          />
          <Form.Checkbox
            label="Should show in the main list?"
            name="show_in_list"
            checked={data.show_in_list}
            onChange={this.onCheckboxChange}
          />

          <Form.Button
            fluid
            color="teal"
            onClick={this.onAddField}
            content="Add"
          />

          <List celled>
            {fields.map((item, idx) => (
              <List.Item key={idx}>
                <List.Content floated="right">
                  <List.Icon name="remove" onClick={() => removeField(item)} />
                </List.Content>
                <List.Content>{item.description}</List.Content>
              </List.Item>
            ))}
          </List>
        </Accordion.Content>
      </Accordion>
    );
  }
}

FieldsAccordionForm.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired
    })
  ).isRequired,
  addField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired
};

export default FieldsAccordionForm;
