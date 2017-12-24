import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Message, Segment } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";

import InlineError from "../messages/InlineError";
import handleServerErrors from "../../utils/handleServerErrors";

class ForgotPasswordForm extends React.Component {
  state = {
    data: {
      email: ""
    },
    loading: false,
    errors: {}
  };

  componentDidMount = () => {
    window.setTimeout(this.focusOnEmailInput, 0);
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
    this.focusOnEmailInput();
  };

  focusOnEmailInput = () => {
    const $input = document.getElementById("forgot-password-email-input");
    if ($input) $input.focus();
  };

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Invalid email";
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {!!errors.global && <Message negative>{errors.global}</Message>}
        <Segment stacked>
          <Form.Field error={!!errors.email}>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              type="email"
              placeholder="example@example.com"
              value={data.email}
              onChange={this.onChange}
              name="email"
              id="forgot-password-email-input"
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
