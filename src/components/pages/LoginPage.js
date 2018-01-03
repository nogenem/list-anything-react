import React, { Component } from "react";
import { Header, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LoginForm from "../forms/LoginForm";
import CenterElemsContainer from "../containers/CenterElemsContainer";
import { login } from "../../actions/auth";

class LoginPage extends Component {
  submit = data =>
    this.props.login(data).then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <CenterElemsContainer>
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>
        <LoginForm submit={this.submit} />
        <Message>
          Dont have an account? <a href="/signup">Sign Up</a> now!
          <br />
          <a href="/forgot_password">Forgot</a> your password?
        </Message>
      </CenterElemsContainer>
    );
  }
}

LoginPage.propTypes = {
  // ownProps
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  // mapDispatchToProps
  login: PropTypes.func.isRequired
};

export const UnconnectedLoginPage = LoginPage;
export default connect(null, { login })(LoginPage);
