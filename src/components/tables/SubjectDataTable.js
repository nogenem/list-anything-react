import React from "react";
import { Table, Loader } from "semantic-ui-react";
import PropTypes from "prop-types";
import sortBy from "lodash.sortby";

import renderFieldComponent from "../../utils/renderFieldComponent";
import SortableDataTableHeader from "./SortableDataTableHeader";
import DataTableBody from "./DataTableBody";

class SubjectDataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.subjectDataArray
    };
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.subjectDataArray !== nextProps.subjectDataArray) {
      this.setState({ data: nextProps.subjectDataArray });
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.loading !== nextProps.loading ||
      this.props.fields !== nextState.fields ||
      this.state.data !== nextState.data
    );
  }

  // Talvez seja necessário lidar com outros tipos também...
  getCellWidth = fieldType =>
    fieldType === "url_input_img" ? { width: 2 } : {};

  sort = (column, clickedColumn) => {
    if (column !== clickedColumn)
      this.setState(prevState => ({
        data: sortBy([...prevState.data], [o => o.data[clickedColumn].value])
      }));
    else
      this.setState(prevState => ({
        data: [...prevState.data].reverse()
      }));
  };

  renderCell = (subjectData, field) => {
    const data = subjectData.data[field._id];
    if (!data) return null;
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

  renderHeader = generateCell => (
    <React.Fragment>
      {this.props.fields.map(
        field =>
          field.show_in_list && generateCell(field._id, field.description)
      )}
    </React.Fragment>
  );

  renderBody = () => {
    const { loading, onTableRowClick, fields } = this.props;
    const { data } = this.state;
    return (
      <React.Fragment>
        {loading && (
          <Table.Row>
            <Table.Cell width={16}>
              <Loader active inline="centered" />
            </Table.Cell>
          </Table.Row>
        )}
        {!loading &&
          !data.length && (
            <Table.Row>
              <Table.Cell width={16}>Nothing was found.</Table.Cell>
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
      </React.Fragment>
    );
  };

  render() {
    return (
      <Table celled compact="very" selectable sortable>
        <SortableDataTableHeader
          data={this.props.subjectDataArray}
          sort={this.sort}
          renderHeader={this.renderHeader}
        />
        <DataTableBody renderBody={this.renderBody} />
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

export default SubjectDataTable;
