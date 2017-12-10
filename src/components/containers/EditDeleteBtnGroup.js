import React from "react";
import PropTypes from "prop-types";
import { Button, Popup, Confirm } from "semantic-ui-react";

class EditDeleteBtnGroup extends React.Component {
  state = { showConfirm: false };

  handleCancel = () => this.setState({ showConfirm: false });

  showConfirm = () => this.setState({ showConfirm: true });

  render() {
    const { onEdit, onDelete } = this.props;
    const { showConfirm } = this.state;
    return (
      <div>
        <Button.Group icon size="medium">
          <Popup
            trigger={<Button icon="edit" color="blue" onClick={onEdit} />}
            content="Edit"
          />
          <Popup
            trigger={
              <Button icon="delete" color="red" onClick={this.showConfirm} />
            }
            content="Delete"
          />
        </Button.Group>
        <Confirm
          open={showConfirm}
          onCancel={this.handleCancel}
          onConfirm={onDelete}
        />
      </div>
    );
  }
}

EditDeleteBtnGroup.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default EditDeleteBtnGroup;
