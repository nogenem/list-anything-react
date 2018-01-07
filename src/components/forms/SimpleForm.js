import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import handleServerErrors from "../../utils/handleServerErrors";

class SimpleForm extends Component {
  state = {
    loading: false,
    errors: {}
  };

  componentDidMount = () => {
    window.setTimeout(this.focusOnFirstInput, 0);
  };

  onSubmit = e => {
    e.preventDefault();

    const data = this.props.getData(this.getInputByName);
    const errors = this.props.validate(data);

    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true, errors: {} });
      this.props.submit(data).catch(err =>
        this.setState({
          loading: false,
          errors: handleServerErrors(err)
        })
      );
    } else this.setState({ errors });
    this.focusOnFirstInput();
  };

  getInputByName = name =>
    document.querySelector(`#${this.props.id} input[name="${name}"]`);

  focusOnFirstInput = () =>
    document.querySelector(`#${this.props.id} input[name]`).focus();

  render() {
    const { id } = this.props;
    const { loading, errors } = this.state;
    return (
      <Form
        id={id}
        onSubmit={this.onSubmit}
        loading={loading}
        error={!!errors.global}
        size="large"
      >
        {this.props.render(this.state)}
      </Form>
    );
  }
}

SimpleForm.propTypes = {
  // ownProps
  id: PropTypes.string,
  validate: PropTypes.func,
  render: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired
};

SimpleForm.defaultProps = {
  id: `my-form-${Math.random()}`,
  validate: () => ({})
};

export default SimpleForm;
