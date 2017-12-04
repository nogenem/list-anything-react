import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Message, Segment } from "semantic-ui-react";

import InlineError from "../messages/InlineError";
import TabsAccordionForm from "./TabsAccordionForm";
import FieldsAccordionForm from "./FieldsAccordionForm";

class NewSubjectForm extends React.Component {
  state = {
    data: {
      description: "",
      tabs: [],
      fields: []
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data).catch(err => {
        if (err.response.status === 500)
          this.setState({
            errors: { global: "Internal server error" },
            loading: false
          });
        else
          this.setState({ errors: err.response.data.errors, loading: false });
      });
    }
  };

  addTab = tab => {
    const newTab = { ...tab };
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        tabs: [...prevState.data.tabs, newTab]
      }
    }));
  };

  removeTab = item => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        tabs: prevState.data.tabs.filter(elem => elem !== item)
      }
    }));
  };

  addField = field => {
    const newField = { ...field };
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        fields: [...prevState.data.fields, newField]
      }
    }));
  };

  removeField = item => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        fields: prevState.data.fields.filter(elem => elem !== item)
      }
    }));
  };

  validate = data => {
    const errors = {};
    if (!data.description) errors.description = "Can't be blank";
    if (data.tabs.length === 0) errors.tabs = "Needs at least one tab";
    if (data.fields.length === 0) errors.fields = "Needs at least one field";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading} size="large">
        {errors.global && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Segment stacked textAlign="left">
          <Form.Field error={!!errors.description}>
            <Form.Input
              fluid
              type="text"
              placeholder="subject description"
              value={data.description}
              onChange={this.onChange}
              name="description"
            />
            {errors.description && <InlineError text={errors.description} />}
          </Form.Field>

          <TabsAccordionForm
            tabs={data.tabs}
            addTab={this.addTab}
            removeTab={this.removeTab}
          />
          {errors.tabs && <InlineError text={errors.tabs} />}

          <FieldsAccordionForm
            fields={data.fields}
            addField={this.addField}
            removeField={this.removeField}
          />
          {errors.fields && <InlineError text={errors.fields} />}

          <Button color="teal" fluid size="large">
            Create
          </Button>
        </Segment>
      </Form>
    );
  }
}

NewSubjectForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default NewSubjectForm;
