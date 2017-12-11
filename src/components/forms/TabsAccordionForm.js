import React, { Component } from "react";
import { Accordion, List, Icon, Form } from "semantic-ui-react";
import PropTypes from "prop-types";

import InlineError from "../messages/InlineError";

class TabsAccordionForm extends Component {
  state = {
    data: {
      description: ""
    },
    active: false,
    error: ""
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onAccordionClick = () =>
    this.setState(prevState => ({ active: !prevState.active }));

  onAddTab = e => {
    e.preventDefault();
    const error = this.validate(this.state.data);
    this.setState({ error });
    if (error === "") {
      this.props.addTab(this.state.data);
      this.setState({
        data: { description: "" }
      });
    }
  };

  validate = data => {
    let error = "";
    const desc = data.description;
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

  render() {
    const { tabs, removeTab } = this.props;
    const { data, active, error } = this.state;

    return (
      <Accordion as={Form.Field}>
        <Accordion.Title
          name="tabs"
          onClick={this.onAccordionClick}
          active={active}
        >
          <Icon name="dropdown" />
          Add tabs
        </Accordion.Title>
        <Accordion.Content active={active}>
          <Form.Group widths={2}>
            <Form.Input
              width={13}
              fluid
              type="text"
              placeholder="tab description"
              name="description"
              value={data.description}
              onChange={this.onChange}
              error={!!error}
            />
            <Form.Button
              color="teal"
              width={3}
              onClick={this.onAddTab}
              content="Add"
            />
          </Form.Group>
          {error && <InlineError text={error} />}
          <List celled>
            {tabs.map((item, idx) => (
              <List.Item key={idx}>
                <List.Content floated="right">
                  <List.Icon
                    link
                    name="remove"
                    onClick={() => removeTab(item)}
                  />
                </List.Content>
                <List.Content>{item.description}</List.Content>
              </List.Item>
            ))}
          </List>
        </Accordion.Content>
      </Accordion>
    );
  }
}

TabsAccordionForm.propTypes = {
  // ownProps
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired
    })
  ).isRequired,
  addTab: PropTypes.func.isRequired,
  removeTab: PropTypes.func.isRequired
};

export default TabsAccordionForm;
