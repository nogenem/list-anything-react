import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Loader } from "semantic-ui-react";

// TODO: deixar mais genérico
class SubjectDataTableBody extends Component {
  shouldComponentUpdate = nextProps => {
    const { loading, data, fields } = this.props;
    return (
      loading !== nextProps.loading ||
      data !== nextProps.data ||
      fields !== nextProps.fields
    );
  };

  render() {
    const { loading, data, fields, onTableRowClick, renderCell } = this.props;
    return (
      <Table.Body style={{ cursor: "pointer" }}>
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
              {fields.map(field => field.show_in_list && renderCell(sd, field))}
            </Table.Row>
          ))}
      </Table.Body>
    );
  }
}

SubjectDataTableBody.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string
    })
  ).isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string
    })
  ).isRequired,
  onTableRowClick: PropTypes.func.isRequired,
  renderCell: PropTypes.func.isRequired
};

export default SubjectDataTableBody;
