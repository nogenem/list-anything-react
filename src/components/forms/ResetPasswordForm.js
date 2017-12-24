import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Message, Segment } from "semantic-ui-react";

import InlineError from "../messages/InlineError";
import handleServerErrors from "../../utils/handleServerErrors";

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

  componentDidMount = () => {
    window.setTimeout(this.focusOnPasswordInput, 0);
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true, errors: {} });
      this.props.submit(this.state.data).catch(err =>
        this.setState({
          errors: handleServerErrors(err),
          loading: false
        })
      );
    } else this.setState({ errors });
    this.focusOnPasswordInput();
  };

  focusOnPasswordInput = () => {
    const $input = document.getElementById("reset-password-input");
    if ($input) $input.focus();
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
              id="reset-password-input"
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
