import React, { Component } from "react";
import { Header } from "semantic-ui-react";

import SignupForm from "../forms/SignupForm";
import SingleFormContainer from "../containers/SingleFormContainer";

class SignupPage extends Component {
  submit = () => {
    console.log("SIGN UP!");
    return Promise.resolve();
  };

  render() {
    return (
      <SingleFormContainer>
        <Header as="h2" color="teal" textAlign="center">
          Sign up now!
        </Header>
        <SignupForm submit={this.submit} />
      </SingleFormContainer>
    );
  }
}

export default SignupPage;
