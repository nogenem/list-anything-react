import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";
import sortBy from "lodash.sortby";

import renderFieldComponent from "../../utils/renderFieldComponent";
import SortableDataTableHeader from "./SortableDataTableHeader";
import DataTableBody from "./DataTableBody";

const headers = [
  { id: "value", description: "Value" },
  { id: "field", description: "Field" },
  { id: "tab", description: "Tab" },
  { id: "subject", description: "Subject" }
];

class SearchResultTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.results
    };
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.results !== nextProps.results) {
      this.setState({ data: nextProps.results });
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.data !== nextState.data;
  }

  sort = (column, clickedColumn) => {
    if (column !== clickedColumn)
      this.setState(prevState => ({
        data: sortBy([...prevState.data], [clickedColumn])
      }));
    else
      this.setState(prevState => ({
        data: [...prevState.data].reverse()
      }));
  };

  renderField = data => {
    const fieldData = {
      value: data.value,
      showFieldDescription: false,
      field: data.field
    };
    return renderFieldComponent(fieldData);
  };

  renderHeader = generateCell => (
    <React.Fragment>
      {headers.map(header => generateCell(header.id, header.description))}
    </React.Fragment>
  );

  renderBody = () => {
    const { data } = this.state;
    return (
      <React.Fragment>
        {!data.length && (
          <Table.Row>
            <Table.Cell width={16}>Nothing was found.</Table.Cell>
          </Table.Row>
        )}
        {data.map(result => (
          <Table.Row
            key={result._id}
            to={`/subject-data/${result._id}`}
            onClick={this.props.onTableRowClick}
          >
            <Table.Cell>{this.renderField(result)}</Table.Cell>
            <Table.Cell collapsing>{result.field.description}</Table.Cell>
            <Table.Cell collapsing>{result.tab}</Table.Cell>
            <Table.Cell collapsing>{result.subject}</Table.Cell>
          </Table.Row>
        ))}
      </React.Fragment>
    );
  };

  render() {
    return (
      <Table celled compact="very" selectable sortable>
        <SortableDataTableHeader
          data={this.props.results}
          sort={this.sort}
          renderHeader={this.renderHeader}
        />
        <DataTableBody renderBody={this.renderBody} />
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
      tab: PropTypes.string,
      field: PropTypes.shape({
        _id: PropTypes.string,
        description: PropTypes.string,
        field_type: PropTypes.string
      })
    })
  ).isRequired,
  onTableRowClick: PropTypes.func.isRequired
};

export default SearchResultTable;
