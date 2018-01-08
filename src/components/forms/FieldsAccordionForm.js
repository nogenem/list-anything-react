import React, { Component } from "react";
import { Accordion, Icon, Form } from "semantic-ui-react";
import PropTypes from "prop-types";

import InlineError from "../messages/InlineError";
import * as fieldTypes from "../../constants/fieldTypes";

import ListValues from "../fields/ListValues";

class FieldsAccordionForm extends Component {
  state = {
    active: true,
    error: ""
  };

  onAccordionClick = () =>
    this.setState(prevState => ({ active: !prevState.active }));

  onAddField = e => {
    e.preventDefault();

    const data = this.getData();
    const error = this.validate(data);

    this.setState({ error });
    if (error === "") this.props.addField(data);

    this.resetFormData();
    const $input = this.getNodeByName("description");
    $input.focus();
  };

  getData = () => ({
    description: this.getNodeByName("description").value,
    field_type: this.getNodeByName("field_type", "select").value,
    is_unique: this.getNodeByName("is_unique").checked,
    show_in_list: this.getNodeByName("show_in_list").checked
  });

  getNodeByName = (name, nodeType = "input") =>
    document.querySelector(`#${this.props.id} ${nodeType}[name="${name}"]`);

  resetFormData = () => {
    this.getNodeByName("description").value = "";
    this.getNodeByName("field_type", "select").value = Object.values(
      fieldTypes
    )[0];

    let $input = this.getNodeByName("is_unique");
    if ($input.checked) $input.click();

    $input = this.getNodeByName("show_in_list");
    if ($input.checked) $input.click();
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

  renderValue = value => value.description;

  render() {
    const { id, fields, removeField } = this.props;
    const { active, error } = this.state;
    return (
      <Accordion id={id} as={Form.Field}>
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
              name="description"
            />
            {error && <InlineError text={error} />}
          </Form.Field>

          <Form.Field
            label="Select the field type:"
            control="select"
            name="field_type"
            defaultValue={Object.values(fieldTypes)[0]}
          >
            {Object.values(fieldTypes).map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </Form.Field>

          <Form.Checkbox label="Is a unique field?" name="is_unique" />
          <Form.Checkbox
            label="Should show in the main list?"
            name="show_in_list"
          />

          <Form.Button
            fluid
            color="teal"
            onClick={this.onAddField}
            content="Add"
          />

          <ListValues
            values={fields}
            onRemove={removeField}
            renderValue={this.renderValue}
          />
        </Accordion.Content>
      </Accordion>
    );
  }
}

FieldsAccordionForm.propTypes = {
  // ownProps
  id: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired
    })
  ).isRequired,
  addField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired
};

FieldsAccordionForm.defaultProps = {
  id: `fields-accordion-${Math.floor(Math.random() * 100000)}`
};

export default FieldsAccordionForm;
