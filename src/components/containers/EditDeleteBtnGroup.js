import React from "react";
import PropTypes from "prop-types";
import { Button, Popup, Confirm } from "semantic-ui-react";

class EditDeleteBtnGroup extends React.Component {
  state = { showConfirm: false };

  handleCancel = () => this.setState({ showConfirm: false });

  showConfirm = () => this.setState({ showConfirm: true });

  render() {
    const { showEdit, onEdit, showDelete, onDelete } = this.props;
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
  // ownProps
  showEdit: PropTypes.bool,
  onEdit: PropTypes.func,
  showDelete: PropTypes.bool,
  onDelete: PropTypes.func
};

EditDeleteBtnGroup.defaultProps = {
  showEdit: true,
  onEdit: null,
  showDelete: true,
  onDelete: null
};

export default EditDeleteBtnGroup;
