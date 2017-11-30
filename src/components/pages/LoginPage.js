import React, { Component } from "react";
import { Header, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LoginForm from "../forms/LoginForm";
import SingleFormContainer from "../containers/SingleFormContainer";
import { login } from "../../actions/auth";

class LoginPage extends Component {
  submit = data =>
    this.props.login(data).then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <SingleFormContainer>
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>
        <LoginForm submit={this.submit} />
        <Message>
          Dont have an account? <a href="/signup">Sign Up</a> now!
          {/* // TODO: implementar 'forgot password?' */}
        </Message>
      </SingleFormContainer>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);
