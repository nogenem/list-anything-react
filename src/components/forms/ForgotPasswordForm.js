import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Segment } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";

import InlineError from "../messages/InlineError";
import ErrorMessage from "../messages/ErrorMessage";
import handleServerErrors from "../../utils/handleServerErrors";

class ForgotPasswordForm extends React.Component {
  state = {
    loading: false,
    errors: {}
  };

  componentDidMount = () => {
    window.setTimeout(this.focusOnEmailInput, 0);
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      email: this.getInputByName("email").value
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
    this.focusOnEmailInput();
  };

  getInputByName = name =>
    document.querySelector(`#forgot-pass-form input[name="${name}"]`);

  focusOnEmailInput = () => {
    const $input = this.getInputByName("email");
    if ($input) $input.focus();
  };

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Invalid email";
    return errors;
  };

  render() {
    const { errors, loading } = this.state;
    return (
      <Form
        id="forgot-pass-form"
        onSubmit={this.onSubmit}
        loading={loading}
        error={!!errors.global}
        size="large"
      >
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
      </Form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  // ownProps
  submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm;
