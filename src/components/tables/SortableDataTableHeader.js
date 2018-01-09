import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";

class SortableDataTableHeader extends Component {
  state = {
    column: null,
    direction: null
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data)
      this.setState({
        column: null,
        direction: null
      });
  }

  generateCell = (id, content) => (
    <Table.HeaderCell
      key={id}
      sorted={this.state.column === id ? this.state.direction : null}
      onClick={this.handleSort(id)}
    >
      {content}
    </Table.HeaderCell>
  );

  handleSort = clickedColumn => () => {
    const { column, direction } = this.state;
    const { sort } = this.props;

    if (column !== clickedColumn) {
      sort(column, clickedColumn);
      this.setState({
        column: clickedColumn,
        direction: "ascending"
      });
    } else {
      sort(column, clickedColumn);
      this.setState({
        direction: direction === "ascending" ? "descending" : "ascending"
      });
    }
  };

  render() {
    return (
      <Table.Header>
        <Table.Row>{this.props.renderHeader(this.generateCell)}</Table.Row>
      </Table.Header>
    );
  }
}

SortableDataTableHeader.propTypes = {
  // ownProps
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  sort: PropTypes.func.isRequired,
  renderHeader: PropTypes.func.isRequired
};

export default SortableDataTableHeader;
