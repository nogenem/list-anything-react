import React from "react";
import { Table, Loader } from "semantic-ui-react";
import PropTypes from "prop-types";
import sortBy from "lodash.sortby";

import renderFieldComponent from "../../utils/renderFieldComponent";

class SubjectDataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      column: null,
      data: props.subjectDataArray,
      direction: null
    };
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.subjectDataArray !== nextProps.subjectDataArray) {
      this.setState({ data: nextProps.subjectDataArray });
    }
  };

  // Talvez seja necessário lidar com outros tipos também...
  getCellWidth = fieldType =>
    fieldType === "url_input_img" ? { width: 2 } : {};

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: sortBy(data, [o => o.data[clickedColumn].value]),
        direction: "ascending"
      });
    } else {
      this.setState({
        data: data.reverse(),
        direction: direction === "ascending" ? "descending" : "ascending"
      });
    }
  };

  renderCell = (subjectData, field) => {
    const data = subjectData.data[field._id];
    return (
      <Table.Cell
        {...this.getCellWidth(field.field_type)}
        collapsing
        key={data._id}
      >
        {this.renderField(data, field)}
      </Table.Cell>
    );
  };

  renderField = (data, field) => {
    const fieldData = {
      key: data._id,
      value: data.value,
      showFieldDescription: false,
      field
    };
    return renderFieldComponent(fieldData);
  };

  render() {
    const { loading, onTableRowClick, fields } = this.props;
    const { column, direction, data } = this.state;

    return (
      <Table celled compact="very" selectable sortable>
        <Table.Header>
          <Table.Row>
            {fields.map(
              field =>
                field.show_in_list && (
                  <Table.HeaderCell
                    key={field._id}
                    sorted={column === field._id ? direction : null}
                    onClick={this.handleSort(field._id)}
                  >
                    {field.description}
                  </Table.HeaderCell>
                )
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body style={{ cursor: "pointer" }}>
          {loading && (
            <Table.Row>
              <Table.Cell width={16}>
                <Loader active inline="centered" />
              </Table.Cell>
            </Table.Row>
          )}
          {!loading &&
            data.map(sd => (
              <Table.Row
                key={sd._id}
                to={`/subject-data/${sd._id}`}
                onClick={onTableRowClick}
              >
                {fields.map(
                  field => field.show_in_list && this.renderCell(sd, field)
                )}
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    );
  }
}

SubjectDataTable.propTypes = {
  // ownProps
  loading: PropTypes.bool.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired
    })
  ).isRequired,
  subjectDataArray: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired
    })
  ).isRequired,
  onTableRowClick: PropTypes.func.isRequired
};

SubjectDataTable.defaultProps = {
  fieldHash: {}
};

export default SubjectDataTable;
