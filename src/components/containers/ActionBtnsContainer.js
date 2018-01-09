import React from "react";
import PropTypes from "prop-types";
import { Button, Popup, Confirm } from "semantic-ui-react";

class ActionBtnsContainer extends React.Component {
  state = { showConfirm: false };

  handleCancel = () => this.setState({ showConfirm: false });

  showConfirm = () => this.setState({ showConfirm: true });

  render() {
    const { onMenu, onAdd, onEdit, onDelete, style } = this.props;
    const { showConfirm } = this.state;
    return (
      <div style={style}>
        {(!!onMenu || !!onAdd) && (
          <Button.Group size="medium" icon>
            {!!onMenu && (
              <Popup
                trigger={<Button icon="sidebar" onClick={onMenu} />}
                content="Side Menu"
              />
            )}
            {!!onAdd && (
              <Popup
                trigger={<Button icon="plus" color="green" onClick={onAdd} />}
                content="Add"
              />
            )}
          </Button.Group>
        )}
        {(!!onEdit || !!onDelete) && (
          <Button.Group size="medium" icon>
            {!!onEdit && (
              <Popup
                trigger={<Button icon="edit" color="blue" onClick={onEdit} />}
                content="Edit"
              />
            )}
            {!!onDelete && (
              <Popup
                trigger={
                  <Button
                    icon="delete"
                    color="red"
                    onClick={this.showConfirm}
                  />
                }
                content="Delete"
              />
            )}
            {!!onDelete && (
              <Confirm
                open={showConfirm}
                onCancel={this.handleCancel}
                onConfirm={onDelete}
              />
            )}
          </Button.Group>
        )}
      </div>
    );
  }
}

ActionBtnsContainer.propTypes = {
  // ownProps
  onMenu: PropTypes.func,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.string)
};

ActionBtnsContainer.defaultProps = {
  onMenu: null,
  onAdd: null,
  onEdit: null,
  onDelete: null,
  style: {}
};

export default ActionBtnsContainer;
