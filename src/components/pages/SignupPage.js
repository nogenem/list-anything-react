import React, { Component } from "react";
import { Grid, Header } from "semantic-ui-react";

import SignupForm from "../forms/SignupForm";

export class SignupPage extends Component {
  submit = () => {
    console.log("SIGN UP!");
    return Promise.resolve();
  };

  render() {
    return (
      <div className="login-form">
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Sign up now!
            </Header>
            <SignupForm submit={this.submit} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default SignupPage;
