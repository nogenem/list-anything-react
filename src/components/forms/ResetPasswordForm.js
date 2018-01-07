import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Segment } from "semantic-ui-react";

import SimpleForm from "./SimpleForm";
import InlineError from "../messages/InlineError";
import ErrorMessage from "../messages/ErrorMessage";

class ResetPasswordForm extends React.Component {
  getData = getInputByName => ({
    token: this.props.token,
    password: getInputByName("password").value,
    passwordConfirmation: getInputByName("passwordConfirmation").value
  });

  validate = data => {
    const errors = {};
    if (!data.password) errors.password = "Can't be blank";
    if (data.password !== data.passwordConfirmation)
      errors.password = "Passwords must match";
    return errors;
  };

  renderFormData = ({ errors }) => (
    <React.Fragment>
      {errors.global && <ErrorMessage text={errors.global} />}
      <Segment stacked>
        <Form.Field error={!!errors.password}>
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            name="password"
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Form.Field error={!!errors.passwordConfirmation}>
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Confirm your new password"
            type="password"
            name="passwordConfirmation"
          />
          {errors.passwordConfirmation && (
            <InlineError text={errors.passwordConfirmation} />
          )}
        </Form.Field>
        <Button color="teal" fluid size="large">
          Reset
        </Button>
      </Segment>
    </React.Fragment>
  );

  render() {
    return (
      <SimpleForm
        id="reset-pass-form"
        validate={this.validate}
        render={this.renderFormData}
        getData={this.getData}
        submit={this.props.submit}
      />
    );
  }
}

ResetPasswordForm.propTypes = {
  // ownProps
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default ResetPasswordForm;
