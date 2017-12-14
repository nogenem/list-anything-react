import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Segment, Button } from "semantic-ui-react";
import forEach from "lodash.foreach";

import ErrorMessage from "../messages/ErrorMessage";
import { getTabsArray, getFieldsArray } from "../../reducers/currentSubject";
import renderFieldComponent from "../../utils/renderFieldComponent";
import handleServerErrors from "../../utils/handleServerErrors";

class NewSubjectDataForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        tabId: props.tabs[0]._id
      },
      errors: {},
      loading: false
    };
  }

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data).catch(err =>
        this.setState({
          errors: handleServerErrors(err),
          loading: false
        })
      );
    }
  };

  validate = data => {
    const errors = {};
    const { fields } = this.props;

    // Not the best validation but...
    let flag = true;
    forEach(fields, val => {
      flag = flag && !data[val._id];
    });
    if (flag) errors[fields[0]._id] = "You must enter at least one value";
    return errors;
  };

  renderField = field => {
    const { errors, data } = this.state;
    const fieldData = {
      key: field._id,
      editable: true,
      error: errors[field._id] || "",
      onChange: this.onChange,
      field,
      value: data[field._id] || ""
    };
    return renderFieldComponent(fieldData);
  };

  render() {
    const { errors, loading, data } = this.state;
    const { tabs, fields } = this.props;
    return (
      <Form onSubmit={this.onSubmit} loading={loading} size="large">
        {errors.global && <ErrorMessage text={errors.global} />}
        <Segment stacked textAlign="left">
          <Form.Field
            label="Select the tab:"
            control="select"
            name="tabId"
            value={data.tabId}
            onChange={this.onChange}
          >
            {tabs.map(tab => (
              <option key={tab._id} value={tab._id}>
                {tab.description}
              </option>
            ))}
          </Form.Field>
          {fields.map(field => this.renderField(field))}
          <Button color="teal" fluid size="large">
            Add
          </Button>
        </Segment>
      </Form>
    );
  }
}

NewSubjectDataForm.propTypes = {
  // ownProps
  submit: PropTypes.func.isRequired,
  // mapStateToProps
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      description: PropTypes.string
    })
  ).isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      description: PropTypes.string
    })
  ).isRequired
};

const mapStateToProps = state => ({
  tabs: getTabsArray(state),
  fields: getFieldsArray(state)
});

export default connect(mapStateToProps)(NewSubjectDataForm);
