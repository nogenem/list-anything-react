import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Segment } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";

import SimpleForm from "./SimpleForm";
import InlineError from "../messages/InlineError";
import ErrorMessage from "../messages/ErrorMessage";

class SignupForm extends React.Component {
  getData = getInputByName => ({
    email: getInputByName("email").value,
    password: getInputByName("password").value
  });

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
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
        <Button color="teal" fluid size="large">
          Sign up
        </Button>
      </Segment>
    </React.Fragment>
  );

  render() {
    return (
      <SimpleForm
        id="signup-form"
        validate={this.validate}
        render={this.renderFormData}
        getData={this.getData}
        submit={this.props.submit}
      />
    );
  }
}

SignupForm.propTypes = {
  // ownProps
  submit: PropTypes.func.isRequired
};

export default SignupForm;
