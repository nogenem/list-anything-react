import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Segment } from "semantic-ui-react";
import forEach from "lodash.foreach";

import renderFieldComponent from "../../utils/renderFieldComponent";
import EditDeleteBtnGroup from "../containers/EditDeleteBtnGroup";
import ErrorMessage from "../messages/ErrorMessage";

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

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => {
      const _id = prevState.data[name]._id;
      return {
        data: {
          ...this.state.data,
          [name]: { _id, value }
        }
      };
    });
  };

  onSubmit = e => {
    if (!this.state.editing) {
      e.preventDefault();
      return;
    }
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .then(() =>
          this.setState({
            data: this.getOriginalFormData(this.props),
            errors: this.getCleanFormErrors(this.props),
            loading: false,
            editing: false
          })
        )
        .catch(err => {
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

  onDelete = () =>
    this.props.delete().catch(() => {
      this.setState({
        errors: { global: "Internal server error" },
        loading: false
      });
    });

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
        data[elem.fieldId] = { _id: elem._id, value: elem.value };
      });
    return data;
  };

  startEditing = () => this.setState({ editing: true });

  cancelEditing = () => {
    this.setState({
      editing: false,
      data: this.getOriginalFormData(this.props),
      errors: this.getCleanFormErrors(this.props)
    });
  };

  validate = data => {
    const errors = {};
    const { fields } = this.props;
    // TODO: Melhorar isso...
    forEach(fields, val => {
      if (!data[val._id]) errors[val._id] = "Can't be blank";
    });
    return errors;
  };

  renderField = field => {
    const { subjectData } = this.props;
    const { editing } = this.state;
    const data = subjectData.data[field._id];

    const fieldData = {
      key: data._id,
      value: this.state.data[data.fieldId].value,
      editable: editing,
      field,
      error: this.state.errors[data.fieldId],
      onChange: this.onChange
    };
    return renderFieldComponent(fieldData);
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
        {errors.global && <ErrorMessage text={errors.global} />}
        {!editing && (
          <EditDeleteBtnGroup
            onEdit={this.startEditing}
            onDelete={this.onDelete}
          />
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
  // ownProps
  submit: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
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
