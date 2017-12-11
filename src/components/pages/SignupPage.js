import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";
import { connect } from "react-redux";

import SignupForm from "../forms/SignupForm";
import CenterElemsContainer from "../containers/CenterElemsContainer";
import { signup } from "../../actions/users";

class SignupPage extends Component {
  submit = data =>
    this.props.signup(data).then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <CenterElemsContainer>
        <Header as="h2" color="teal" textAlign="center">
          Sign up now!
        </Header>
        <SignupForm submit={this.submit} />
      </CenterElemsContainer>
    );
  }
}

SignupPage.propTypes = {
  // ownProps
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  // mapDispatchToProps
  signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(SignupPage);
