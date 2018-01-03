import React from "react";
import PropTypes from "prop-types";
import { Message, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { confirm } from "../../actions/auth";
import CenterElemsContainer from "../containers/CenterElemsContainer";

class ConfirmationPage extends React.Component {
  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    this.props
      .confirm(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  render() {
    const { loading, success } = this.state;

    return (
      <CenterElemsContainer>
        {loading && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Validating your email</Message.Header>
          </Message>
        )}

        {!loading &&
          success && (
            <Message success icon>
              <Icon name="checkmark" />
              <Message.Content>
                <Message.Header>
                  Thank you. Your account has been verified.
                </Message.Header>
                <Link to="/dashboard">Go to your dashboard</Link>
              </Message.Content>
            </Message>
          )}

        {!loading &&
          !success && (
            <Message negative icon>
              <Icon name="warning sign" />
              <Message.Content>
                <Message.Header>Ooops. Invalid token it seems.</Message.Header>
              </Message.Content>
            </Message>
          )}
      </CenterElemsContainer>
    );
  }
}

ConfirmationPage.propTypes = {
  // ownProps
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  // mapDispatchToProps
  confirm: PropTypes.func.isRequired
};

export const UnconnectedConfirmationPage = ConfirmationPage;
export default connect(null, { confirm })(ConfirmationPage);
