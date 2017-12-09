import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Message, Segment, Popup } from "semantic-ui-react";
import forEach from "lodash.foreach";

import * as fieldTypes from "../../constants/fieldTypes";

import TextInputField from "../fields/TextInputField";
import UrlInputImgField from "../fields/UrlInputImgField";
import NumberInputField from "../fields/NumberInputField";
import TextareaField from "../fields/TextareaField";
import UrlInputField from "../fields/UrlInputField";

class SubjectDataForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.getOriginalFormData(props),
      loading: false,
      editing: false,
      errors: this.getCleanFormErrors(props)
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

  getCleanFormErrors = props => {
    const errors = {};
    if (props.subjectData.data)
      forEach(Object.values(props.subjectData.data), elem => {
        errors[elem.fieldId] = "";
      });
    return errors;
  };

  getOriginalFormData = props => {
    const data = {};
    if (props.subjectData.data)
      forEach(Object.values(props.subjectData.data), elem => {
        data[elem.fieldId] = elem.value;
      });
    return data;
  };

  startEditing = () => {
    this.setState({ editing: true });
  };

  cancelEditing = () => {
    this.setState({
      editing: false,
      data: this.getOriginalFormData(this.props),
      errors: this.getCleanFormErrors(this.props)
    });
  };

  validate = data => {
    const errors = {};
    return errors;
  };

  renderField = field => {
    const { subjectData } = this.props;
    const { editing } = this.state;
    const data = subjectData.data[field._id];

    const fieldData = {
      key: data._id,
      value: this.state.data[data.fieldId],
      editable: editing,
      field,
      error: this.state.errors[data.fieldId],
      onChange: this.onChange
    };
    switch (field.field_type) {
      case fieldTypes.TEXT_INPUT:
        return <TextInputField {...fieldData} />;
      case fieldTypes.URL_INPUT_IMG:
        return <UrlInputImgField {...fieldData} />;
      case fieldTypes.NUMBER_INPUT:
        return <NumberInputField {...fieldData} />;
      case fieldTypes.TEXTAREA:
        return <TextareaField {...fieldData} />;
      case fieldTypes.URL_INPUT:
        return <UrlInputField {...fieldData} />;
      default:
        return <div key={data._id} />;
    }
  };

  render() {
    const { errors, loading, editing } = this.state;
    const { fields } = this.props;

    return (
      <Form
        onSubmit={this.onSubmit}
        loading={loading}
        size="large"
        style={{ textAlign: "left" }}
      >
        {errors.global && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        {!editing && (
          <Button.Group icon size="medium" style={{ marginBottom: "3px" }}>
            <Popup
              trigger={
                <Button icon="edit" color="blue" onClick={this.startEditing} />
              }
              content="Edit"
            />
            <Popup
              trigger={<Button icon="delete" color="red" />}
              content="Delete"
            />
          </Button.Group>
        )}
        <Segment stacked>
          {fields.map(field => this.renderField(field))}

          {editing && (
            <Button.Group size="medium" widths={2}>
              <Button color="blue">Save</Button>
              <Button color="red" onClick={this.cancelEditing}>
                Cancel
              </Button>
            </Button.Group>
          )}
        </Segment>
      </Form>
    );
  }
}

SubjectDataForm.propTypes = {
  submit: PropTypes.func.isRequired,
  subjectData: PropTypes.shape({
    _id: PropTypes.string,
    data: PropTypes.objectOf(
      PropTypes.shape({
        fieldId: PropTypes.string,
        value: PropTypes.string
      })
    )
  }).isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired
    })
  ).isRequired
};

export default SubjectDataForm;
