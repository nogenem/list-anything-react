import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message, Header } from "semantic-ui-react";

import { resetPasswordRequest } from "../../actions/auth";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";
import CenterElemsContainer from "../containers/CenterElemsContainer";

class ForgotPasswordPage extends React.Component {
  state = {
    success: false
  };

  submit = data =>
    this.props
      .resetPasswordRequest(data)
      .then(() => this.setState({ success: true }));

  render() {
    return (
      <CenterElemsContainer>
        {this.state.success ? (
          <Message>Email has been sent.</Message>
        ) : (
          <div>
            <Header as="h2" color="teal" textAlign="center">
              Reset your password
            </Header>
            <ForgotPasswordForm submit={this.submit} />
          </div>
        )}
      </CenterElemsContainer>
    );
  }
}

ForgotPasswordPage.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);
