import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Message, Segment } from "semantic-ui-react";
import Validator from "validator";
import InlineError from "../messages/InlineError";

class LoginForm extends React.Component {
  state = {
    data: {
      email: "",
      password: ""
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
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
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
          <Button color="teal" fluid size="large">
            Login
          </Button>
        </Segment>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
