import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Segment } from "semantic-ui-react";

import InlineError from "../messages/InlineError";
import ErrorMessage from "../messages/ErrorMessage";
import handleServerErrors from "../../utils/handleServerErrors";

class ResetPasswordForm extends React.Component {
  state = {
    loading: false,
    errors: {}
  };

  componentDidMount = () => {
    window.setTimeout(this.focusOnPasswordInput, 0);
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      token: this.props.token,
      password: this.getInputByName("password").value,
      passwordConfirmation: this.getInputByName("passwordConfirmation").value
    };

    const errors = this.validate(data);
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true, errors: {} });
      this.props.submit(data).catch(err =>
        this.setState({
          errors: handleServerErrors(err),
          loading: false
        })
      );
    } else this.setState({ errors });
    this.focusOnPasswordInput();
  };

  getInputByName = name =>
    document.querySelector(`#reset-pass-form input[name="${name}"]`);

  focusOnPasswordInput = () => {
    const $input = this.getInputByName("password");
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
    const { errors, loading } = this.state;
    return (
      <Form
        id="reset-pass-form"
        onSubmit={this.onSubmit}
        loading={loading}
        error={!!errors.global}
        size="large"
      >
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
