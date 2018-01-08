import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import PropTypes from "prop-types";

import InlineError from "../messages/InlineError";
import * as fieldTypes from "../../constants/fieldTypes";

import ListValues from "../fields/ListValues";
import SimpleAccordionForm from "./SimpleAccordionForm";

class FieldsAccordionForm extends Component {
  getData = getNodeByName => ({
    description: getNodeByName("description").value,
    field_type: getNodeByName("field_type", "select").value,
    is_unique: getNodeByName("is_unique").checked,
    show_in_list: getNodeByName("show_in_list").checked
  });

  resetFormData = getNodeByName => {
    let $input = getNodeByName("description");
    $input.value = "";

    $input = getNodeByName("field_type", "select");
    $input.value = Object.values(fieldTypes)[0];

    $input = getNodeByName("is_unique");
    if ($input.checked) $input.click();

    $input = getNodeByName("show_in_list");
    if ($input.checked) $input.click();
  };

  validate = ({ description: desc }) => {
    const errors = {};
    if (!desc) errors.description = "Can't be blank";
    else {
      const duplicated = this.props.fields.reduce(
        (acc, item) => acc || item.description === desc,
        false
      );
      if (duplicated) errors.description = "Can't have duplicates";
    }
    return errors;
  };

  renderValue = value => value.description;

  renderFormData = ({ errors }, onSubmit) => (
    <React.Fragment>
      <Form.Field error={!!errors.description}>
        <Form.Input
          fluid
          type="text"
          placeholder="field description"
          name="description"
        />
        {errors.description && <InlineError text={errors.description} />}
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

      <Form.Button fluid color="teal" onClick={onSubmit} content="Add" />

      <ListValues
        values={this.props.fields}
        onRemove={this.props.removeField}
        renderValue={this.renderValue}
      />
    </React.Fragment>
  );

  render() {
    return (
      <SimpleAccordionForm
        id={this.props.id}
        title="Add Field"
        validate={this.validate}
        render={this.renderFormData}
        submit={this.props.addField}
        getData={this.getData}
        resetFormData={this.resetFormData}
      />
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
