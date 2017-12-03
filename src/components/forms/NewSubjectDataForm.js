import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Segment, Message, Button } from "semantic-ui-react";
import forEach from "lodash.foreach";

import TextInputField from "../fields/TextInputField";
import UrlInputImgField from "../fields/UrlInputImgField";

class NewSubjectDataForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        tabId: props.subject.tabs[0]._id
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
      this.props.submit(this.state.data).catch(err => {
        if (err.response.status === 500)
          this.setState({
            errors: { global: "Internal server error" },
            loading: false
          });
        else
          this.setState({ errors: err.response.data.errors, loading: false });
      });
    }
  };

  validate = data => {
    const errors = {};
    const { subject } = this.props;
    // TODO: Melhorar isso...
    forEach(subject.fields, val => {
      if (!data[val._id]) errors[val._id] = "Can't be blank";
    });
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
    switch (field.field_type) {
      case "text_input":
        return <TextInputField {...fieldData} />;
      case "url_input_img":
        return <UrlInputImgField {...fieldData} />;
      default:
        return <div key={field._id} />;
    }
  };

  render() {
    const { errors, loading, data } = this.state;
    const { subject } = this.props;
    return (
      <Form onSubmit={this.onSubmit} loading={loading} size="large">
        {errors.global && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Segment stacked textAlign="left">
          <Form.Field
            label="Select the tab:"
            control="select"
            name="tab"
            value={data.tabId}
            onChange={this.onChange}
          >
            {subject.tabs.map(tab => (
              <option key={tab._id} value={tab._id}>
                {tab.description}
              </option>
            ))}
          </Form.Field>
          {subject.fields.map(field => this.renderField(field))}
          <Button color="teal" fluid size="large">
            Add
          </Button>
        </Segment>
      </Form>
    );
  }
}

NewSubjectDataForm.propTypes = {
  submit: PropTypes.func.isRequired,
  subject: PropTypes.shape({
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
  }).isRequired
};

function mapStateToProps(state) {
  return {
    subject: state.subject
  };
}

export default connect(mapStateToProps)(NewSubjectDataForm);
