import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import PropTypes from "prop-types";

import InlineError from "../messages/InlineError";
import ListValues from "../fields/ListValues";
import SimpleAccordionForm from "./SimpleAccordionForm";

class TabsAccordionForm extends Component {
  getData = getNodeByName => ({
    description: getNodeByName("description").value
  });

  resetFormData = getNodeByName => {
    const $input = getNodeByName("description");
    $input.value = "";
  };

  validate = ({ description: desc }) => {
    const errors = {};
    if (!desc) errors.description = "Can't be blank";
    else {
      const duplicated = this.props.tabs.reduce(
        (acc, item) => acc || item.description === desc,
        false
      );
      if (duplicated) errors.description = "Can't have duplicates";
    }
    return errors;
  };

  renderValue = value => value.description;

  renderFormData = ({ errors }, onSubmit) => (
    <React.Fragment>
      <Form.Group widths={2} unstackable className="inline-input-btn">
        <Form.Input
          fluid
          width={13}
          type="text"
          placeholder="tab description"
          name="description"
          error={!!errors.description}
        />
        <Form.Button width={3} color="teal" onClick={onSubmit} content="Add" />
      </Form.Group>
      {errors.description && <InlineError text={errors.description} />}
      <ListValues
        values={this.props.tabs}
        onRemove={this.props.removeTab}
        renderValue={this.renderValue}
      />
    </React.Fragment>
  );

  render() {
    return (
      <SimpleAccordionForm
        id={this.props.id}
        title="Add Tab"
        validate={this.validate}
        render={this.renderFormData}
        submit={this.props.addTab}
        getData={this.getData}
        resetFormData={this.resetFormData}
      />
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
