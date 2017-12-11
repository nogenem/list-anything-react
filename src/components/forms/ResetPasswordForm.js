import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Message, Segment } from "semantic-ui-react";

import InlineError from "../messages/InlineError";

class ResetPasswordForm extends React.Component {
  state = {
    data: {
      token: this.props.token,
      password: "",
      passwordConfirmation: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
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

  validate = data => {
    const errors = {};
    if (!data.password) errors.password = "Can't be blank";
    if (data.password !== data.passwordConfirmation)
      errors.password = "Passwords must match";
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {!!errors.global && <Message negative>{errors.global}</Message>}
        <Segment stacked>
          <Form.Field error={!!errors.password}>
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={data.password}
              onChange={this.onChange}
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
              value={data.passwordConfirmation}
              onChange={this.onChange}
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
      </Form>
    );
  }
}

ResetPasswordForm.propTypes = {
  // ownProps
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default ResetPasswordForm;
