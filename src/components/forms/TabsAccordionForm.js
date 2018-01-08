import React, { Component } from "react";
import { Accordion, Icon, Form } from "semantic-ui-react";
import PropTypes from "prop-types";

import InlineError from "../messages/InlineError";
import ListValues from "../fields/ListValues";

class TabsAccordionForm extends Component {
  state = {
    active: true,
    error: ""
  };

  onAccordionClick = () =>
    this.setState(prevState => ({ active: !prevState.active }));

  onAddTab = e => {
    e.preventDefault();

    const data = this.getData();
    const error = this.validate(data);

    this.setState({ error });
    if (error === "") this.props.addTab(data);

    this.resetFormData();
    const $input = this.getNodeByName("description");
    $input.focus();
  };

  getData = () => ({
    description: this.getNodeByName("description").value
  });

  getNodeByName = (name, nodeType = "input") =>
    document.querySelector(`#${this.props.id} ${nodeType}[name="${name}"]`);

  resetFormData = () => {
    this.getNodeByName("description").value = "";
  };

  validate = ({ description: desc }) => {
    let error = "";
    if (!desc) error = "Can't be blank";
    else {
      const duplicated = this.props.tabs.reduce(
        (acc, item) => acc || item.description === desc,
        false
      );
      if (duplicated) error = "Can't have duplicates";
    }
    return error;
  };

  renderValue = value => value.description;

  render() {
    const { id, tabs, removeTab } = this.props;
    const { active, error } = this.state;
    return (
      <Accordion id={id} as={Form.Field}>
        <Accordion.Title
          name="tabs"
          onClick={this.onAccordionClick}
          active={active}
        >
          <Icon name="dropdown" />
          Add tabs
        </Accordion.Title>
        <Accordion.Content active={active}>
          <Form.Group widths={2} unstackable className="inline-input-btn">
            <Form.Input
              fluid
              width={13}
              type="text"
              placeholder="tab description"
              name="description"
              error={!!error}
            />
            <Form.Button
              width={3}
              color="teal"
              onClick={this.onAddTab}
              content="Add"
            />
          </Form.Group>
          {error && <InlineError text={error} />}
          <ListValues
            values={tabs}
            onRemove={removeTab}
            renderValue={this.renderValue}
          />
        </Accordion.Content>
      </Accordion>
    );
  }
}

TabsAccordionForm.propTypes = {
  // ownProps
  id: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string
    })
  ).isRequired,
  addTab: PropTypes.func.isRequired,
  removeTab: PropTypes.func.isRequired
};

TabsAccordionForm.defaultProps = {
  id: `tabs-accordion-${Math.floor(Math.random() * 100000)}`
};

export default TabsAccordionForm;
