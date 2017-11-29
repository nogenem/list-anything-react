import React, { Component } from "react";
import { Grid, Header, Message } from "semantic-ui-react";

import LoginForm from "../forms/LoginForm";

class LoginPage extends Component {
  submit = () => {
    console.log("LOGIN!"); // TODO: terminar isso!
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
              Log-in to your account
            </Header>
            <LoginForm submit={this.submit} />
            <Message>
              Don't have an account? <a href="/signup">Sign Up</a> now!
              {/* // TODO: implementar 'forgot password?' */}
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginPage;
