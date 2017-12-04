import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Message, Segment } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";

import InlineError from "../messages/InlineError";

class ForgotPasswordForm extends React.Component {
  state = {
    data: {
      email: ""
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
  submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm;
