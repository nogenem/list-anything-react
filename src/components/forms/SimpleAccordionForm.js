import React, { Component } from "react";
import PropTypes from "prop-types";
import { Accordion, Form, Icon } from "semantic-ui-react";

class SimpleAccordionForm extends Component {
  state = {
    active: true,
    errors: {}
  };

  onAccordionClick = () =>
    this.setState(prevState => ({ active: !prevState.active }));

  onSubmit = e => {
    e.preventDefault();

    const data = this.props.getData(this.getNodeByName);
    const errors = this.props.validate(data);

    this.setState({ errors });
    if (Object.keys(errors).length === 0) this.props.submit(data);

    this.props.resetFormData(this.getNodeByName);
    this.focusOnFirstInput();
  };

  getNodeByName = (name, nodeType = "input") =>
    document.querySelector(`#${this.props.id} ${nodeType}[name="${name}"]`);

  focusOnFirstInput = () =>
    document.querySelector(`#${this.props.id} input[name]`).focus();

  render() {
    const { id, title, render } = this.props;
    const { active } = this.state;
    return (
      <Accordion id={id} as={Form.Field}>
        <Accordion.Title
          name="tabs"
          onClick={this.onAccordionClick}
          active={active}
        >
          <Icon name="dropdown" />
          {title}
        </Accordion.Title>
        <Accordion.Content active={active}>
          {render(this.state, this.onSubmit)}
        </Accordion.Content>
      </Accordion>
    );
  }
}

SimpleAccordionForm.propTypes = {
  // ownProps
  id: PropTypes.string,
  title: PropTypes.string,
  validate: PropTypes.func,
  render: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  resetFormData: PropTypes.func.isRequired
};

SimpleAccordionForm.defaultProps = {
  id: `accordion-form-${Math.floor(Math.random() * 100000)}`,
  title: "Accordion",
  validate: () => ({})
};

export default SimpleAccordionForm;
