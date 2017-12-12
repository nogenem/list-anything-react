import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";

class SearchResultTable extends Component {
  render() {
    const { results, onTableRowClick } = this.props;
    return (
      <Table celled compact="very" selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Value</Table.HeaderCell>
            <Table.HeaderCell>Tab</Table.HeaderCell>
            <Table.HeaderCell>Subject</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body style={{ cursor: "pointer" }}>
          {results.map(result => (
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
