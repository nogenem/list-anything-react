import React from "react";
import { Table, Loader } from "semantic-ui-react";
import PropTypes from "prop-types";

import renderFieldComponent from "../../utils/renderFieldComponent";

const renderField = (data, field) => {
  const fieldData = {
    key: data._id,
    value: data.value,
    showFieldDescription: false,
    field
  };
  return renderFieldComponent(fieldData);
};

// Talvez seja necessário lidar com outros tipos também...
const getCellWidth = fieldType =>
  fieldType === "url_input_img" ? { width: 2 } : {};

const renderCell = (subjectData, field) => {
  const data = subjectData.data[field._id];
  return (
    <Table.Cell {...getCellWidth(field.field_type)} collapsing key={data._id}>
      {renderField(data, field)}
    </Table.Cell>
  );
};

const SubjectDataTable = ({
  loading,
  onTableRowClick,
  fields,
  subjectDataArray
}) => (
  <Table celled compact="very" selectable>
    <Table.Header>
      <Table.Row>
        {fields.map(field => (
          <Table.HeaderCell key={field._id}>
            {field.description}
          </Table.HeaderCell>
        ))}
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
        subjectDataArray.map(sd => (
          <Table.Row
            key={sd._id}
            to={`/subject-data/${sd._id}`}
            onClick={onTableRowClick}
          >
            {fields.map(field => renderCell(sd, field))}
          </Table.Row>
        ))}
    </Table.Body>
  </Table>
);

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
