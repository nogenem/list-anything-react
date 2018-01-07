import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Segment } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";

import SimpleForm from "./SimpleForm";
import InlineError from "../messages/InlineError";
import ErrorMessage from "../messages/ErrorMessage";

class ForgotPasswordForm extends React.Component {
  getData = getInputByName => ({
    email: getInputByName("email").value
  });

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Invalid email";
    return errors;
  };

  renderFormData = ({ errors }) => (
    <React.Fragment>
      {errors.global && <ErrorMessage text={errors.global} />}
      <Segment stacked>
        <Form.Field error={!!errors.email}>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            type="email"
            placeholder="example@example.com"
            name="email"
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Button color="teal" fluid size="large">
          Send email
        </Button>
      </Segment>
    </React.Fragment>
  );

  render() {
    return (
      <SimpleForm
        id="forgot-pass-form"
        validate={this.validate}
        render={this.renderFormData}
        getData={this.getData}
        submit={this.props.submit}
      />
    );
  }
}

ForgotPasswordForm.propTypes = {
  // ownProps
  submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm;
