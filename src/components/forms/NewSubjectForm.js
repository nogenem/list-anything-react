import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Segment, Divider } from "semantic-ui-react";

import ErrorMessage from "../messages/ErrorMessage";
import InlineError from "../messages/InlineError";
import TabsAccordionForm from "./TabsAccordionForm";
import FieldsAccordionForm from "./FieldsAccordionForm";

import SimpleForm from "./SimpleForm";

class NewSubjectForm extends React.Component {
  state = {
    tabs: [],
    fields: []
  };

  getData = getInputByName => ({
    description: getInputByName("description").value,
    tabs: this.state.tabs,
    fields: this.state.fields
  });

  addTab = tab => {
    const newTab = { ...tab };
    this.setState(prevState => ({
      tabs: [...prevState.tabs, newTab]
    }));
  };

  removeTab = item => {
    this.setState(prevState => ({
      tabs: prevState.tabs.filter(elem => elem !== item)
    }));
  };

  addField = field => {
    const newField = { ...field };
    this.setState(prevState => ({
      fields: [...prevState.fields, newField]
    }));
  };

  removeField = item => {
    this.setState(prevState => ({
      fields: prevState.fields.filter(elem => elem !== item)
    }));
  };

  validate = data => {
    const errors = {};
    if (!data.description) errors.description = "Can't be blank";
    if (data.tabs.length === 0) errors.tabs = "Needs at least one tab";
    if (data.fields.length === 0) errors.fields = "Needs at least one field";
    else {
      const flag = data.fields.reduce(
        (prev, elem) => prev || elem.show_in_list,
        false
      );
      if (!flag) errors.fields = "Needs at least one field to show in list";
    }
    return errors;
  };

  renderFormData = ({ errors }) => (
    <React.Fragment>
      {errors.global && <ErrorMessage text={errors.global} />}
      <Segment stacked>
        <Form.Field error={!!errors.description}>
          <Form.Input
            fluid
            type="text"
            placeholder="subject description"
            name="description"
          />
          {errors.description && <InlineError text={errors.description} />}
        </Form.Field>
        <TabsAccordionForm
          tabs={this.state.tabs}
          addTab={this.addTab}
          removeTab={this.removeTab}
        />
        {errors.tabs && <InlineError text={errors.tabs} />}
        <FieldsAccordionForm
          fields={this.state.fields}
          addField={this.addField}
          removeField={this.removeField}
        />
        {errors.fields && <InlineError text={errors.fields} />}

        <Divider />
        <Button color="teal" fluid size="large">
          Create
        </Button>
      </Segment>
    </React.Fragment>
  );

  render() {
    return (
      <SimpleForm
        id="new-subject-form"
        validate={this.validate}
        render={this.renderFormData}
        getData={this.getData}
        submit={this.props.submit}
      />
    );
  }
}

NewSubjectForm.propTypes = {
  // ownProps
  submit: PropTypes.func.isRequired
};

export default NewSubjectForm;
