import React from "react";
import PropTypes from "prop-types";
import { Button, Popup, Confirm } from "semantic-ui-react";

class EditDeleteBtnGroup extends React.Component {
  state = { showConfirm: false };

  handleCancel = () => this.setState({ showConfirm: false });

  showConfirm = () => this.setState({ showConfirm: true });

  render() {
    const { onEdit, showEdit, onDelete, showDelete } = this.props;
    const { showConfirm } = this.state;
    return (
      <Button.Group size="medium" icon>
        {showEdit && (
          <Popup
            trigger={<Button icon="edit" color="blue" onClick={onEdit} />}
            content="Edit"
          />
        )}
        {showDelete && (
          <Popup
            trigger={
              <Button icon="delete" color="red" onClick={this.showConfirm} />
            }
            content="Delete"
          />
        )}
        {showDelete && (
          <Confirm
            open={showConfirm}
            onCancel={this.handleCancel}
            onConfirm={onDelete}
          />
        )}
      </Button.Group>
    );
  }
}

EditDeleteBtnGroup.propTypes = {
  onEdit: PropTypes.func,
  showEdit: PropTypes.boolean,
  onDelete: PropTypes.func,
  showDelete: PropTypes.boolean
};

EditDeleteBtnGroup.defaultProps = {
  onEdit: null,
  showEdit: true,
  onDelete: null,
  showDelete: true
};

export default EditDeleteBtnGroup;
