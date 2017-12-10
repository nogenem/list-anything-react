import React from "react";
import PropTypes from "prop-types";
import { Button, Popup } from "semantic-ui-react";

const EditDeleteBtnGroup = ({ onEdit, onDelete }) => (
  <Button.Group icon size="medium">
    <Popup
      trigger={<Button icon="edit" color="blue" onClick={onEdit} />}
      content="Edit"
    />
    <Popup
      trigger={<Button icon="delete" color="red" onClick={onDelete} />}
      content="Delete"
    />
  </Button.Group>
);

EditDeleteBtnGroup.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default EditDeleteBtnGroup;
