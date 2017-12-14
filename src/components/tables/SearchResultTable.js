import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";
import sortBy from "lodash.sortby";

class SearchResultTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      column: null,
      data: props.results,
      direction: null
    };
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.results !== nextProps.results) {
      this.setState({ data: nextProps.results });
    }
  };

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: sortBy(data, [clickedColumn]),
        direction: "ascending"
      });
    } else {
      this.setState({
        data: data.reverse(),
        direction: direction === "ascending" ? "descending" : "ascending"
      });
    }
  };

  render() {
    const { onTableRowClick } = this.props;
    const { column, data, direction } = this.state;

    return (
      <Table celled compact="very" selectable sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === "value" ? direction : null}
              onClick={this.handleSort("value")}
            >
              Value
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "tab" ? direction : null}
              onClick={this.handleSort("tab")}
            >
              Tab
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "subject" ? direction : null}
              onClick={this.handleSort("subject")}
            >
              Subject
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body style={{ cursor: "pointer" }}>
          {!data.length && (
            <Table.Row>
              <Table.Cell width={16}>Nothing was found.</Table.Cell>
            </Table.Row>
          )}
          {data.map(result => (
            <Table.Row
              key={result._id}
              to={`/subject-data/${result._id}`}
              onClick={onTableRowClick}
            >
              <Table.Cell collapsing>{result.value}</Table.Cell>
              <Table.Cell collapsing>{result.tab}</Table.Cell>
              <Table.Cell collapsing>{result.subject}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

SearchResultTable.propTypes = {
  // ownProps
  results: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      value: PropTypes.string,
      subject: PropTypes.string,
      tab: PropTypes.string
    })
  ).isRequired,
  onTableRowClick: PropTypes.func.isRequired
};

export default SearchResultTable;
